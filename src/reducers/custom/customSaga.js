import { fork, take, put } from 'redux-saga/effects'
import UniFetch from '../../lib/uniFetch'
import * as customActions from './customActions'

const {
  SEND_POST,
} = require('../../constants/actions').default

export function* sendPost(payload) {
  try {
    yield put(customActions.sendPostRequest())
    const res = yield UniFetch({
      method: 'POST',
      path: '/api/posts',
      body: payload.body,
    })
    console.log(res)
    if (res.finish && res.modify) {
      yield put(customActions.sendPostSuccess())
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

