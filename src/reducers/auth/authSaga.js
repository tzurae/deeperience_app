/* @flow */
import { call, fork, put, take } from 'redux-saga/effects'
import * as authActions from '../../reducers/auth/authActions'
import apiFactory from '../../api/apiFactory'
import UserModel from '../../model/UserModel'
import { Actions } from 'react-native-router-flux'

const {
  SIGNUP_START,
  INIT_AUTH,
} = require('../../lib/constants').default

const api = new apiFactory()

/**
 * flow type
 */
type Payload = {
  username: string,
  email: string,
  password: string,
}

function *signUp(payload: Payload) {
  try {
    yield put(authActions.signupRequest())
    // user is a promise backed from firebase
    const user = yield call([api, api.signup], payload.email, payload.password)
    // newUser will be written in database
    const newUser = yield new UserModel(user.uid,{
      email: user.email,
      displayName: user.displayName,
    })
    yield call([api, api.writeDataBase], newUser.getPath(), newUser.getData())
    yield put(authActions.signupSuccess({
      uid: user.uid,
      dispalyName: user.displayName,
      email: user.email,
    }))
    yield put(authActions.logoutState())
    yield Actions.Tabbar()
  }
  catch(error) {
    yield put(authActions.signupFailure(error))
  }
}

function *initAuth() {
  try {
    const user = yield call([api, api.initAuth])
    if(user) {
      yield put(authActions.loginSuccess({
        uid: user.uid,
        dispalyName: user.displayName,
        email: user.email,
      }))
      yield put(authActions.logoutState())
      yield Actions.Tabbar()
    }
    else {
      yield Actions.InitialLoginForm()
    }
  }
  catch(error) {
    yield put(authActions.loginFailure())
  }
}


/**
 * Watchers
 */

function* watchSignUp() {
  while(true) {
    let { payload } = yield take(SIGNUP_START)
    yield fork(signUp, payload)
  }
}

function* watchInitAuth() {
  while(true) {
    yield take(INIT_AUTH)
    yield fork(initAuth)
  }
}

export default authSagas = [
  fork(watchSignUp),
  fork(watchInitAuth),
]