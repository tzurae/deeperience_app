import { put, call, take, fork } from 'redux-saga/effects'
import { expect } from 'chai'
import * as authActions from '../authActions'
import ApiFactory from '../../../api/apiFactory'
import UserModel from '../../../model/UserModel'
import { appAuthToken } from '../authToken'
import {
  watchSignUp,
  watchLogin,
  watchLogout,
  watchInitAuth,
  watchResetPassword,
  watchFacebookLogin,
  initAuth,
  signUp,
  login,
  logout,
  resetPassword,
  facebookLogin,
} from '../authSaga'

const {
  SIGNUP_START,
  LOGOUT_START,
  LOGIN_START,
  RESET_PASSWORD_START,
  INIT_AUTH,
  FB_LOGIN_START,
} = require('../../../lib/constants').default

const api = new ApiFactory()

describe('signup', () => {
  it('watchSignUp should take the SIGN_UP action', () => {
    const gen = watchSignUp()
    const next = gen.next().value
    expect(next).to.deep.equal(take(SIGNUP_START))
  })

  it('should signup successful', () => {
    const name = 'fakeJohn'
    const email = 'fake@gmail.com'
    const password = 'fake2134'
    const _id = '1234'
    const payload = { username: name, email, password }
    const user = { _id, name, email: { value: email } }
    const token = 'asdasda'
    const response = { token }

    const gen = signUp(payload)
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.signupRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.signup], payload))

    next = gen.next(user).value
    expect(next).to.deep.equal(put(authActions.signupSuccess(user)))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.login], payload))

    next = gen.next(response).value
    expect(next).to.deep.equal(appAuthToken.storeSessionToken({ user, token }))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequestSuccess(token)))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.logoutState()))
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
    const username = 'fakeJohn'
    const email = 'fake@gmail.com'
    const uid = '1234'
    const avatar = 'https://www.facebook.com'
    const token = 'asdasdasdasd'
    const response = {
      token,
      user: {
        _id: uid,
        name: username,
        email: {
          value: email,
        },
        avatarURL: avatar,
      },
    }
    const gen = initAuth()
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.initAuth]))

    next = gen.next(response).value
    expect(next).to.deep.equal(put(authActions.loginSuccess(response.user)))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequestSuccess(token)))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.logoutState()))
  })

  it('InitAuth with the user unregistered', () => {
    const response = {}
    const gen = initAuth()
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.initAuth]))

    next = gen.next(response).value
    expect(next).to.deep.equal(put(authActions.loginState()))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequestFailure()))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginFailure('No token')))
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
    const action = {
      payload: {
        name: 'fake',
      },
    }
    const gen = watchLogin()
    let next = gen.next().value
    expect(next).to.deep.equal(take(LOGIN_START))
    next = gen.next(action).value
    expect(next).to.deep.equal(fork(login, action.payload))
  })

  it('should login successful', () => {
    const username = 'fakeJohn'
    const email = 'fake@gmail.com'
    const password = 'fake2134'
    const uid = '1234'
    const avatar = 'https://www.facebook.com'
    const token = 'asdasdasdasd'
    const payload = { email, password }
    const response = {
      isAuth: true,
      token,
      user: {
        _id: uid,
        name: username,
        email: {
          value: email,
        },
        avatarURL: avatar,
      },
    }

    const gen = login(payload)
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.login], payload))

    next = gen.next(response).value
    expect(next).to.deep.equal(
      put(authActions.loginSuccess(response.user)))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequestSuccess(token)))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.logoutState()))
  })

  it('should login fail', () => {
    const email = 'fake@gmail.com'
    const password = 'fake2134'
    const payload = { email, password }
    const response = {
      isAuth: false,
    }

    const gen = login(payload)
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.login], payload))

    next = gen.next(response).value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequestFailure()))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginFailure('Auth Error')))
  })
})

describe('resetPassword', () => {
  it('watchResetPassword should take the RESET_PASSWORD action', () => {
    const action = {
      payload: 'fake@gmail.com',
    }

    const gen = watchResetPassword()
    let next = gen.next().value
    expect(next).to.deep.equal(take(RESET_PASSWORD_START))
    next = gen.next(action).value
    expect(next).to.deep.equal(fork(resetPassword, action.payload))
  })

  it('should resetPassowrd successful', () => {
    const email = 'fake@gmail.com'
    const gen = resetPassword(email)
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.resetPasswordRequest()))
    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.resetPassword], email))
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginState()))
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.resetPasswordSuccess()))
  })
})

describe('facebookLogin', () => {
  it('watchFacebookLogin should take the FB_LOGIN_START action', () => {
    const action = {
      payload: 'asdafafsgasgrtgweyh',
    }

    const gen = watchFacebookLogin()
    let next = gen.next().value
    expect(next).to.deep.equal(take(FB_LOGIN_START))
    next = gen.next(action).value
    expect(next).to.deep.equal(fork(facebookLogin, action.payload))
  })

  it('should login facebook successful', () => {
    const username = 'fakeJohn'
    const email = 'fake@gmail.com'
    const token = 'asdafsfdgsahsadfsdf'
    const uid = '1234'
    const avatar = 'https://www.facebook.com'
    const payload = token
    const user = { uid, displayName: username, email, photoURL: avatar }
    const newUser = new UserModel(uid, { email, username, avatar })

    const gen = facebookLogin(payload)
    let next = gen.next().value
    expect(next).to.deep.equal(call([api, api.fblogin], payload))
    next = gen.next(user).value
    expect(next).to.deep.equal(newUser)
    next = gen.next(newUser).value
    expect(next).to.deep.equal(
      call([api, api.updateDataBase], newUser.getPath(), newUser.getData()))
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginSuccess({
      uid: user.uid,
      ...newUser.getData(),
    })))
  })
})
