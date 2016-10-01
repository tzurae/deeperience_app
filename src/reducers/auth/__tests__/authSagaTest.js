import { put, call, take, fork } from 'redux-saga/effects'
import { expect } from 'chai'
import * as authActions from '../../../reducers/auth/authActions'
import apiFactory from '../../../api/apiFactory'
import UserModel from '../../../model/UserModel'
import {
  watchSignUp,
  watchLogin,
  watchLogout,
  watchInitAuth,
  watchResetPassword,
  initAuth,
  signUp,
  login,
  logout,
  resetPassword,
} from '../authSaga'

const {
  SIGNUP_START,
  LOGOUT_START,
  LOGIN_START,
  RESET_PASSWORD_START,
  INIT_AUTH,
} = require('../../../lib/constants').default


const api = new apiFactory()

describe('SignUp', () => {

  it('watchSignUp should take the SIGN_UP action', () => {
    const gen = watchSignUp()
    let next = gen.next().value
    expect(next).to.deep.equal(take(SIGNUP_START))

  })

  it('should signUp successufl', () => {
    const fakeUser = {
      uid: 1234,
      displayName: 'fakeJohn',
      email: 'fake@gmail.com',
      password: 'fake',
      getPath: '/users/1234',
    }

    const gen = signUp(fakeUser)
    const signUpRequest = gen.next().value
    expect(signUpRequest).to.deep.equal(put(authActions.signupRequest()))

    const dbSignUpRequest = gen.next(fakeUser.email, fakeUser.password).value
    expect(dbSignUpRequest).to.deep.equal(call([api, api.signup], fakeUser.email, fakeUser.password))

    const newUser = gen.next(fakeUser).value;
    expect(newUser).to.deep.equal(new UserModel(fakeUser.uid,{
      email: fakeUser.email,
      displayName: fakeUser.displayName,
    }))

    const dbWriteDataRequest = gen.next(newUser).value
    expect(dbWriteDataRequest).to.deep.equal(call([api, api.writeDataBase], fakeUser.getPath, {email:fakeUser.email,
      displayName:fakeUser.displayName}))

    const signUpSuccessRequest = gen.next().value
    expect(signUpSuccessRequest).to.deep.equal(put(authActions.signupSuccess({uid:fakeUser.uid})))

    const logoutState = gen.next().value
    expect(logoutState).to.deep.equal(put(authActions.logoutState()))
  })
})

describe('InitAuth', () => {

  it('watchInitAuth should take INIT_AUTH action', () => {
    const gen = watchInitAuth()
    let next = gen.next().value
    expect(next).to.deep.equal(take(INIT_AUTH))
    next = gen.next().value
    expect(next).to.deep.equal(fork(initAuth))
  })

  it('InitAuth with the user registered successful in our app ', () => {
    const user = {
      uid: 1234,
      displayName: 'fakeYou',
      email: 'fake@gmai.com',
    }
    const gen = initAuth()
    let next = gen.next().value
    expect(next).to.deep.equal(call([api, api.initAuth]))

    next = gen.next(user).value
    expect(next).to.deep.equal(put(authActions.loginSuccess({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    })))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.logoutState()))
  })

  it('InitAuth with the user unregistered', () => {
    const gen = initAuth()
    let next = gen.next().value
    expect(next).to.deep.equal(call([api, api.initAuth]))
    next = gen.next(false).value
    expect(next).to.deep.equal(put(authActions.loginState()))
  })

})

describe('logout', () => {
  
  it('watchLogout should take the LOGOUT action', () => {
    const gen = watchLogout()
    let next = gen.next().value
    expect(next).to.deep.equal(take(LOGOUT_START))
    next = gen.next().value
    expect(next).to.deep.equal(fork(logout))
  })
  
  it('should logout successful', () => {
    const gen = logout() 
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.logoutRequest()))
    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.logout]))
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginState()))
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.logoutSuccess()))
  })
  
})

describe('login', () => {

  it('watchLogin should take the LOGIN action', () => {
    const fakeUser = {
      name: 'fake',
    }
    const gen = watchLogin()
    let next = gen.next().value
    expect(next).to.deep.equal(take(LOGIN_START))
    next = gen.next(fakeUser).value
    expect(next).to.deep.equal(fork(login, fakeUser))
  })

  it('should login successful', () => {
    const fakeUser = {
      uid: 1234,
      displayName: 'fakeYou',
      email: 'fake@gmai.com',
      password: 'fake'
    }
    const gen = login(fakeUser)
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginRequest()))
    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.login], fakeUser.email, fakeUser.password))
    next = gen.next(fakeUser).value
    expect(next).to.deep.equal(put(authActions.loginSuccess({
      uid: fakeUser.uid,
      displayName: fakeUser.displayName,
      email: fakeUser.email,
    })))
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.logoutState()))
  })
})

describe('resetPassword', () => {
  
  const fakeUser = {
    email: 'fake@gmail.com',
  }
  
  it('watchResetPassword should take the RESET_PASSWORD action', () => {
    const gen = watchResetPassword()
    next = gen.next().value
    expect(next).to.deep.equal(take(RESET_PASSWORD_START))
    next = gen.next(fakeUser).value
    expect(next).to.deep.equal(fork(resetPassword, fakeUser))
  })
  
  it('should resetPassowrd successful', () => {
    const gen = resetPassword(fakeUser) 
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.resetPasswordRequest()))
    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.resetPassword], fakeUser.email))
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginState()))
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.resetPasswordSuccess()))
  })

})
