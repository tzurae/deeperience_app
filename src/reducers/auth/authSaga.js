import { call, fork, take, put } from 'redux-saga/effects'
import * as authActions from './authActions'
import * as mainActions from '../main/mainActions'
import { getMainStorage } from '../main/mainStorage'
import ApiFactory from '../../api/apiFactory'
import { Actions } from 'react-native-router-flux'
import SimpleAlert from 'react-native-simpledialog-android'
import I18n from '../../lib/i18n'
import { appAuthToken } from './authToken'
import UniFetch from '../../lib/uniFetch'
const {
  USER_FORGET_PASSWORD,
} = require('../../constants/FormNames').default

const {
  SIGNUP_START,
  LOGOUT_START,
  LOGIN_START,
  RESET_PASSWORD_START,
  INIT_AUTH,
  FB_LOGIN,
} = require('../../constants/actions').default

const api = new ApiFactory()

function saveSessionToken(payload) {
  return appAuthToken.storeSessionToken(payload)
}

function deleteSessionToken() {
  return appAuthToken.deleteSessionToken()
}

export function* signUp(payload) {
  try {
    yield put(authActions.signupRequest())
    const user = yield call([api, api.signup], payload)
    if (user) {
      yield put(authActions.signupSuccess(user))
      yield put(authActions.sessionTokenRequest())
      const { token } = yield call([api, api.login], payload)
      yield saveSessionToken({ user, token })
      yield put(authActions.sessionTokenRequestSuccess({ token }))

      yield put(authActions.logoutState())
      SimpleAlert.alert(I18n.t('AuthMessage.info'),
        I18n.t('AuthMessage.verificationEmailSend'),
        () => Actions.Main())
    } else {
      SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.emailExisted'))
      yield put(authActions.signupFailure('email existed'))
    }
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.signupError'))
    yield put(authActions.signupFailure(error))
  }
}

export function* initAuth() {
  const { firstTime } =  yield getMainStorage()
  if (firstTime === undefined || firstTime === true) {
    setTimeout(() => Actions.Introduction(), 4000)
  } else {
    try {
      yield put(mainActions.setFirstTime())
      yield put(authActions.sessionTokenRequest())
      const { user, token, fbToken } = yield call([api, api.initAuth]) // hasn't deal with expiration problem
      if (fbToken) {
        // yield fork(facebookLogin, fbToken) // uncomment this line to get the full data, but it really wastes time
        yield put(authActions.loginSuccess(user))
        yield put(authActions.sessionTokenRequestSuccess({ fbToken }))
        yield put(authActions.logoutState())
        setTimeout(() => Actions.Main(), 4000)
      } else if (token) {
        yield put(authActions.loginSuccess(user))
        yield put(authActions.sessionTokenRequestSuccess({ token }))
        yield put(authActions.logoutState())
        setTimeout(() => Actions.Main(), 4000)
      } else {
        yield put(authActions.loginState())
        yield put(authActions.sessionTokenRequestFailure())
        yield put(authActions.loginFailure('No token'))
        setTimeout(() => Actions.LoginMain({ back: false }), 4000)
      }
    } catch (error) {
      SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.loginError'))
      yield put(authActions.loginFailure(error))
      yield put(authActions.sessionTokenRequestFailure())
      Actions.LoginMain()
    }
  }
}

export function* logout() {
  try {
    yield put(authActions.logoutRequest())
    yield call([api, api.logout])
    yield put(authActions.loginState())
    yield put(authActions.logoutSuccess())
    yield deleteSessionToken()
  } catch (error) {
    yield put(authActions.loginState())
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.logoutError'))
    yield put(authActions.logoutFailure(error))
  }
}

export function* login(payload) {
  try {
    yield put(authActions.loginRequest())
    yield put(authActions.sessionTokenRequest())
    const { isAuth, token, user } = yield call([api, api.login], payload)
    if (isAuth && token) {
      yield put(authActions.loginSuccess(user))

      saveSessionToken({ user, token })
      yield put(authActions.sessionTokenRequestSuccess({ token }))
      yield put(authActions.logoutState())
      Actions.Main()
    } else {
      SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.loginError'))
      yield put(authActions.sessionTokenRequestFailure())
      yield put(authActions.loginFailure('Auth Error'))
    }
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.loginError'))
    yield put(authActions.loginFailure(error))
  }
}

export function* resetPassword(email) {
  try {
    yield put(authActions.resetPasswordRequest())
    const passed = yield UniFetch({
      method: 'POST',
      path: `/api/forms/${USER_FORGET_PASSWORD}/fields/email/validation`,
      body: {
        value: email,
      },
    })
    if (passed.isPassed) {
      yield UniFetch({
        method: 'POST',
        path: '/api/users/password/request-reset',
      })
      yield put(authActions.loginState())
      yield put(authActions.resetPasswordSuccess())
      SimpleAlert.alert(I18n.t('AuthMessage.info'),
        I18n.t('AuthMessage.resetEmailSend'),
        () => Actions.pop())
    } else {
      SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.resetPasswordError'))
      yield put(authActions.resetPasswordFailure(passed.message))
    }
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.resetPasswordError'))
    yield put(authActions.resetPasswordFailure(error))
  }
}

export function* facebookLogin(token) {
  try {
    yield put(authActions.loginRequest())
    let likes = []
    let domain = `https://graph.facebook.com/v2.8/me/likes?limit=100&access_token=${token}`
    while (true) {
      const payload = yield UniFetch({
        method: 'GET',
        domain,
      })
      if (!payload.data) break
      likes = yield likes.concat(payload.data)
      if (payload.paging && payload.paging.next) {
        domain = payload.paging.next
      } else {
        break
      }
    }
    let friends = []
    domain = `https://graph.facebook.com/v2.8/me/friends?limit=100&access_token=${token}`
    while (true) {
      const payload = yield UniFetch({
        method: 'GET',
        domain,
      })
      if (!payload.data) break
      friends = yield friends.concat(payload.data)
      if (payload.paging && payload.paging.next) {
        domain = payload.paging.next
      } else {
        break
      }
    }
    const fbData = yield UniFetch({
      method: 'GET',
      domain: `https://graph.facebook.com/v2.8/me?fields=email,name,picture,friends,permissions,birthday,likes&access_token=${token}`,
    })
    const {
      email,
      name,
      id,
      picture,
    } = fbData
    let birthday = fbData.birthday
    birthday = {
      year: Number(birthday.substr(6, 4)),
      month: Number(birthday.substr(3, 2)),
      day: Number(birthday.substr(0, 2)),
    }

    const sendData = {
      friends,
      likes,
      birthday,
      email,
      name,
      id,
      picture,
    }

    const { user } = yield call([api, api.fblogin], sendData)
    if (user) {
      yield saveSessionToken({ user, fbToken: token })
      yield put(authActions.sessionTokenRequestSuccess({ fbToken: token }))
      yield put(authActions.loginSuccess(user))
      Actions.Main()
    } else {
      SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.loginError'))
      yield put(authActions.loginFailure('login failed'))
    }
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.loginError'))
    yield put(authActions.loginFailure(error))
    Actions.LoginMain()
  }
}

/**
 * Watchers
 */

export function* watchSignUp() {
  while (true) {
    const { payload } = yield take(SIGNUP_START)
    yield fork(signUp, payload)
  }
}

export function* watchInitAuth() {
  while (true) {
    yield take(INIT_AUTH)
    yield fork(initAuth)
  }
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT_START)
    yield fork(logout)
  }
}

export function* watchLogin() {
  while (true) {
    const { payload } = yield take(LOGIN_START)
    yield fork(login, payload)
  }
}

export function* watchResetPassword() {
  while (true) {
    const { payload } = yield take(RESET_PASSWORD_START)
    yield fork(resetPassword, payload)
  }
}

export function* watchFacebookLogin() {
  while (true) {
    const { payload } = yield take(FB_LOGIN)
    yield fork(facebookLogin, payload)
  }
}

export default [
  fork(watchSignUp),
  fork(watchInitAuth),
  fork(watchLogout),
  fork(watchLogin),
  fork(watchResetPassword),
  fork(watchFacebookLogin),
]
