import { call, fork, take, put } from 'redux-saga/effects'
import * as authActions from '../../reducers/auth/authActions'
import ApiFactory from '../../api/apiFactory'
import UserModel from '../../model/UserModel'
import { Actions } from 'react-native-router-flux'
import SimpleAlert from 'react-native-simpledialog-android'
import I18n from '../../lib/i18n'

const {
  SIGNUP_START,
  LOGOUT_START,
  LOGIN_START,
  RESET_PASSWORD_START,
  INIT_AUTH,
} = require('../../lib/constants').default

const api = new ApiFactory()

export function* signUp(payload) {
  try {
    yield put(authActions.signupRequest())
    // user is a promise backed from firebase
    const user = yield call([api, api.signup], payload)
    // newUser will be written in database
    const newUser =  yield new UserModel(user.uid, {
      email: user.email,
      name: payload.username,
    })
    yield call([api, api.writeDataBase], newUser.getPath(), newUser.getData())
    yield put(authActions.signupSuccess({ uid: user.uid }))
    yield put(authActions.logoutState())
    Actions.pop()
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.signupError'))
    yield put(authActions.signupFailure(error))
  }
}

export function* initAuth() {
  try {
    const user = yield call([api, api.initAuth])
    if (user) {
      yield put(authActions.loginSuccess({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      }))
      yield put(authActions.logoutState())
    } else {
      yield (put(authActions.loginState()))
    }
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.loginError'))
    yield put(authActions.loginFailure(error))
  }
}

export function* logout() {
  try {
    yield put(authActions.logoutRequest())
    yield call([api, api.logout])
    yield put(authActions.loginState())
    yield put(authActions.logoutSuccess())
  } catch (error) {
    yield put(authActions.loginState())
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.logoutError'))
    yield put(authActions.logoutFailure(error))
  }
}

export function* login(payload) {
  try {
    yield put(authActions.loginRequest())
    const user = yield call([api, api.login], payload)
    yield put(authActions.loginSuccess({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }))
    yield put(authActions.logoutState())
    Actions.pop()
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.loginError'))
    yield put(authActions.loginFailure(error))
  }
}

export function* resetPassword(payload) {
  try {
    yield put(authActions.resetPasswordRequest())
    yield call([api, api.resetPassword], payload.email)
    yield put(authActions.loginState())
    yield put(authActions.resetPasswordSuccess())
    Actions.Login()
  } catch (error) {
    SimpleAlert.alert(I18n.t('AuthMessage.error'), I18n.t('AuthMessage.resetPasswordError'))
    yield put(authActions.resetPasswordFailure(error))
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
    const payload = yield take(RESET_PASSWORD_START)
    yield fork(resetPassword, payload)
  }
}

export default [
  fork(watchSignUp),
  fork(watchInitAuth),
  fork(watchLogout),
  fork(watchLogin),
  fork(watchResetPassword),
]
