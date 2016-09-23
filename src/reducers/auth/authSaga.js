/* @flow */
import { call, fork, take, put } from 'redux-saga/effects'
import * as authActions from '../../reducers/auth/authActions'
import apiFactory from '../../api/apiFactory'
import UserModel from '../../model/UserModel'
import { Actions } from 'react-native-router-flux'

const {
  SIGNUP_START,
  LOGOUT_START,
  LOGIN_START,
  RESET_PASSWORD_START,
  INIT_AUTH,
} = require('../../lib/constants').default

const api = new apiFactory()

export function *signUp(payload) {
  try {
    yield put(authActions.signupRequest())
    // user is a promise backed from firebase
    const user = yield call([api, api.signup], payload.email, payload.password)
    // newUser will be written in database
    const newUser =  yield new UserModel(user.uid,{
      email: user.email,
      displayName: user.displayName,
    })
    yield call([api, api.writeDataBase], newUser.getPath(), newUser.getData())
    yield put(authActions.signupSuccess({uid:user.uid}))
    yield put(authActions.logoutState())
    Actions.Tabbar()
  }
  catch(error) {
    yield put(authActions.signupFailure(error))
  }
}

export function *initAuth() {
  try {
    const user = yield call([api, api.initAuth])
    if(user) {

      yield put(authActions.loginSuccess({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      }))
      yield put(authActions.logoutState())
      Actions.Tabbar()
    }
    else {
      yield(put(authActions.loginState()))
      Actions.InitialLoginForm()
    }
  }
  catch(error) {
    yield put(authActions.loginFailure())
  }
}

export function *logout() {
  try {
    yield put(authActions.logoutRequest())
    yield call([api, api.logout])
    yield put(authActions.loginState())
    yield put(authActions.logoutSuccess())
    Actions.InitialLoginForm()
  }
  catch(error) {
    yield put(authActions.loginState())
    yield put(authActions.logoutFailure())
  }
}

export function *login(payload) {
  try {
    yield put(authActions.loginRequest())
    const user = yield call([api, api.login],payload.email,payload.password)
    yield put(authActions.loginSuccess({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    }))
    yield put(authActions.logoutState())
    Actions.Tabbar()
  }
  catch(error) {
    yield put(authActions.loginFailure())
  }
}

export function *resetPassword(payload) {
  try {
    yield put(authActions.resetPasswordRequest())
    yield call([api, api.resetPassword],payload.email)
    yield put(authActions.loginState())
    yield put(authActions.resetPasswordSuccess())
    Actions.Login()
  }
  catch(error) {
    yield put(authActions.resetPasswordFailure())
  }
}

/**
 * Watchers
 */

export function* watchSignUp() {
  while(true) {
    let { payload } = yield take(SIGNUP_START)
    yield fork(signUp, payload)
  }
}

export function* watchInitAuth() {
  while(true) {
    yield take(INIT_AUTH)
    yield fork(initAuth)
  }
}

export function* watchLogout() {
  while(true) {
    yield take(LOGOUT_START)
    yield fork(logout)
  }
}

export function* watchLogin() {
  while(true) {
    let payload  = yield take(LOGIN_START)
    yield fork(login, payload)
  }
}

export function* watchResetPassword() {
  while(true) {
    let payload = yield take(RESET_PASSWORD_START)
    yield fork(resetPassword, payload)
  }
}

export default authSagas = [
  fork(watchSignUp),
  fork(watchInitAuth),
  fork(watchLogout),
  fork(watchLogin),
  fork(watchResetPassword),
]