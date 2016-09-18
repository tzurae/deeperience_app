import { put, call, take, fork } from 'redux-saga/effects'
import { expect } from 'chai'
import { watchSignUp } from '../authSaga'
const {
  SIGNUP_START,
  LOGOUT_START,
  LOGIN_START,
  RESET_PASSWORD_START,
  INIT_AUTH,
} = require('../../../lib/constants').default

describe('watchSignUp', () => {
  it('check watchSignUp', () => {
    const gen = watchSignUp()
    const next = gen.next().value
    expect(next).to.deep.equal(take(SIGNUP_START))
  })
})

