import { fork, take, put } from 'redux-saga/effects'
import { Actions } from 'react-native-router-flux'
import UniFetch from '../../lib/uniFetch'
import * as customActions from './customActions'

const {
  SEND_POST,
} = require('../../lib/constants').default

export function* sendPost(payload) {
  try {
    console.log(payload.userId)
    console.log(payload.token)
    yield put(customActions.sendPostRequest())
    const res = yield UniFetch({
      method: 'POST',
      path: `/api/posts/${payload.userId}`,
      body: payload.body,
      token: payload.token,
    })
    console.log(res)
    if (res.finish && res.modify) {
      yield put(customActions.sendPostSuccess())
      // todo must change page
      // Actions
    } else {
      yield put(customActions.sendPostFailure('Create Post Failed'))
    }
  } catch (err) {
    yield put(customActions.sendPostFailure(err))
  }
}

/**
 * Watchers
 */

export function* watchSendPost() {
  while (true) {
    const { payload } = yield take(SEND_POST)
    yield fork(sendPost, payload)
  }
}

export default [
  fork(watchSendPost),
]

