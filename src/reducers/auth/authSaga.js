import { call, fork, take, put } from 'redux-saga/effects'
import * as authActions from './authActions'
import * as mainActions from '../main/mainActions'
import { getMainStorage } from '../main/mainStorage'
import ApiFactory from '../../api/apiFactory'
import UserModel from '../../model/UserModel'
import { Actions } from 'react-native-router-flux'
import SimpleAlert from 'react-native-simpledialog-android'
import I18n from '../../lib/i18n'
import { appAuthToken } from './authToken'

const {
  SIGNUP_START,
  LOGOUT_START,
  LOGIN_START,
  RESET_PASSWORD_START,
  INIT_AUTH,
  FB_LOGIN_START,
} = require('../../lib/constants').default

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
    yield put(authActions.signupSuccess(user))

    yield put(authActions.sessionTokenRequest())
    const { token } = yield call([api, api.login], payload)
    yield saveSessionToken({ user, token })
    yield put(authActions.sessionTokenRequestSuccess(token))

    yield put(authActions.logoutState())
    Actions.Main()
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
      const { user, token } = yield call([api, api.initAuth]) // hasn't deal with expiration problem
      if (token) {
        yield put(authActions.loginSuccess(user))
        yield put(authActions.sessionTokenRequestSuccess(token))
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
      yield put(authActions.sessionTokenRequestSuccess(token))
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

// todo server not yet
export function* resetPassword(email) {
  try {
    yield put(authActions.resetPasswordRequest())
    yield call([api, api.resetPassword], email)
    yield put(authActions.loginState())
    yield put(authActions.resetPasswordSuccess())
    Actions.pop()
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.resetPasswordError'))
    yield put(authActions.resetPasswordFailure(error))
  }
}

// todo server not yet
export function* facebookLogin(payload) {
  try {
    const user = yield call([api, api.fblogin], payload)
    const newUser =  yield new UserModel(user.uid, {
      email: user.email,
      username: user.displayName,
      avatar: user.photoURL,
    })
    yield call([api, api.updateDataBase], newUser.getPath(), newUser.getData())
    yield put(authActions.loginSuccess({
      uid: user.uid,
      ...newUser.getData(),
    }))
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.loginError'))
    yield put(authActions.loginFailure(error))
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
    const { payload } = yield take(FB_LOGIN_START)
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
