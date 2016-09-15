import { call, fork, put, take } from 'redux-saga/effects'
import * as authActions from '../../reducers/auth/authActions'
import apiFactory from '../../api/apiFactory'

/**
 * Watchers
 */

function* watchSignUp() {
  while(true) {
    let { payload } = yield take(authActions.signup)

  }
}

export default authSagas = [
  fork(watchSignUp),
]