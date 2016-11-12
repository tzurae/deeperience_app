import { put, call, take, fork } from 'redux-saga/effects'
import { expect } from 'chai'
import * as authActions from '../authActions'
import * as mainActions from '../../main/mainActions'
import ApiFactory from '../../../api/apiFactory'
import { appAuthToken } from '../authToken'
import { getMainStorage } from '../../main/mainStorage'
import UniFetch from '../../../lib/uniFetch'
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
import { likesRes, friendsRes, fbDataRes } from './fakeAuthData'

const {
  USER_FORGET_PASSWORD,
} = require('../../../constants/FormNames').default

const {
  SIGNUP_START,
  LOGOUT_START,
  LOGIN_START,
  RESET_PASSWORD_START,
  INIT_AUTH,
  FB_LOGIN,
} = require('../../../constants/actions').default

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
    expect(next).to.deep.equal(put(authActions.sessionTokenRequestSuccess({ token })))

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
    const mainStorage = { firstTime: false }
    const gen = initAuth()
    let next = gen.next().value
    expect(next).to.deep.equal(getMainStorage())

    next = gen.next(mainStorage).value
    expect(next).to.deep.equal(put(mainActions.setFirstTime()))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.initAuth]))

    next = gen.next(response).value
    expect(next).to.deep.equal(put(authActions.loginSuccess(response.user)))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequestSuccess({ token })))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.logoutState()))
  })

  it('InitAuth with the user unregistered', () => {
    const response = {}
    const mainStorage = { firstTime: false }
    const gen = initAuth()
    let next = gen.next().value
    expect(next).to.deep.equal(getMainStorage())

    next = gen.next(mainStorage).value
    expect(next).to.deep.equal(put(mainActions.setFirstTime()))

    next = gen.next().value
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

  it('InitAuth with the user registered with fb', () => {
    const username = 'fakeJohn'
    const email = 'fake@gmail.com'
    const uid = '1234'
    const avatar = 'https://www.facebook.com'
    const fbToken = 'asdasdasdasd'
    const response = {
      fbToken,
      user: {
        _id: uid,
        name: username,
        email: {
          value: email,
        },
        avatarURL: avatar,
      },
    }
    const mainStorage = { firstTime: false }
    const gen = initAuth()
    let next = gen.next().value
    expect(next).to.deep.equal(getMainStorage())

    next = gen.next(mainStorage).value
    expect(next).to.deep.equal(put(mainActions.setFirstTime()))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(call([api, api.initAuth]))

    next = gen.next(response).value
    expect(next).to.deep.equal(put(authActions.loginSuccess(response.user)))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.sessionTokenRequestSuccess({ fbToken })))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.logoutState()))
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
    expect(next).to.deep.equal(put(authActions.sessionTokenRequestSuccess({ token })))

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
    const passed = {
      isPassed: true,
    }

    const gen = resetPassword(email)
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.resetPasswordRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(UniFetch({
      method: 'POST',
      path: `/api/forms/${USER_FORGET_PASSWORD}/fields/email/validation`,
      body: {
        value: email,
      },
    }))

    next = gen.next(passed).value
    expect(next).to.deep.equal(UniFetch({
      method: 'POST',
      path: '/api/users/password/request-reset',
    }))

    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.loginState()))
    next = gen.next().value
    expect(next).to.deep.equal(put(authActions.resetPasswordSuccess()))
  })

  it('should resetPassowrd failed', () => {
    const email = 'fake@gmail.com'
    const passed = {
      isPassed: false,
      message: 'error',
    }

    const gen = resetPassword(email)
    let next = gen.next().value
    expect(next).to.deep.equal(put(authActions.resetPasswordRequest()))

    next = gen.next().value
    expect(next).to.deep.equal(UniFetch({
      method: 'POST',
      path: `/api/forms/${USER_FORGET_PASSWORD}/fields/email/validation`,
      body: {
        value: email,
      },
    }))

    next = gen.next(passed).value
    expect(next).to.deep.equal(put(authActions.resetPasswordFailure(passed.message)))
  })
})

describe('facebookLogin', () => {
  it('watchFacebookLogin should take the FB_LOGIN_START action', () => {
    const action = {
      payload: 'asdafafsgasgrtgweyh',
    }

    const gen = watchFacebookLogin()
    let next = gen.next().value
    expect(next).to.deep.equal(take(FB_LOGIN))
    next = gen.next(action).value
    expect(next).to.deep.equal(fork(facebookLogin, action.payload))
  })
  describe('should login facebook', () => {
    const token = 'aasdadsasd'

    const {
      email,
      name,
      id,
      picture,
    } = fbDataRes
    let birthday = fbDataRes.birthday
    birthday = {
      year: Number(birthday.substr(6, 4)),
      month: Number(birthday.substr(3, 2)),
      day: Number(birthday.substr(0, 2)),
    }
    const sendData = {
      friends: friendsRes.data,
      likes: likesRes.data,
      birthday,
      email,
      name,
      id,
      picture,
    }

    const user = {
      _id: 'asdasdasd',
      name: 'asdasdasdas',
      email: {
        value: 'asdasdas@y.com',
      },
      avatarURL: 'asdadasd',
    }

    it('success', () => {
      const gen = facebookLogin(token)
      let next = gen.next().value
      expect(next).to.deep.equal(put(authActions.loginRequest()))

      next = gen.next().value
      expect(next).to.deep.equal(UniFetch({
        method: 'GET',
        domain: `https://graph.facebook.com/v2.8/me/likes?limit=100&access_token=${token}`,
      }))

      next = gen.next(likesRes).value
      expect(next).to.deep.equal(likesRes.data)

      next = gen.next(likesRes.data).value
      expect(next).to.deep.equal(UniFetch({
        method: 'GET',
        domain: `https://graph.facebook.com/v2.8/me/friends?limit=100&access_token=${token}`,
      }))

      next = gen.next(friendsRes).value
      expect(next).to.deep.equal(friendsRes.data)

      next = gen.next(friendsRes.data).value
      expect(next).to.deep.equal(UniFetch({
        method: 'GET',
        domain: `https://graph.facebook.com/v2.8/me?fields=email,name,picture,friends,permissions,birthday,likes&access_token=${token}`,
      }))

      next = gen.next(fbDataRes).value
      expect(next).to.deep.equal(call([api, api.fblogin], sendData))

      next = gen.next({ user }).value
      expect(next).to.deep.equal(appAuthToken.storeSessionToken({ user, fbToken: token }))

      next = gen.next().value
      expect(next).to.deep.equal(put(authActions.sessionTokenRequestSuccess({ fbToken: token })))

      next = gen.next().value
      expect(next).to.deep.equal(put(authActions.loginSuccess(user)))
    })
    it('failure', () => {
      const gen = facebookLogin(token)
      let next = gen.next().value
      expect(next).to.deep.equal(put(authActions.loginRequest()))

      next = gen.next().value
      expect(next).to.deep.equal(UniFetch({
        method: 'GET',
        domain: `https://graph.facebook.com/v2.8/me/likes?limit=100&access_token=${token}`,
      }))

      next = gen.next(likesRes).value
      expect(next).to.deep.equal(likesRes.data)

      next = gen.next(likesRes.data).value
      expect(next).to.deep.equal(UniFetch({
        method: 'GET',
        domain: `https://graph.facebook.com/v2.8/me/friends?limit=100&access_token=${token}`,
      }))

      next = gen.next(friendsRes).value
      expect(next).to.deep.equal(friendsRes.data)

      next = gen.next(friendsRes.data).value
      expect(next).to.deep.equal(UniFetch({
        method: 'GET',
        domain: `https://graph.facebook.com/v2.8/me?fields=email,name,picture,friends,permissions,birthday,likes&access_token=${token}`,
      }))

      next = gen.next(fbDataRes).value
      expect(next).to.deep.equal(call([api, api.fblogin], sendData))

      next = gen.next({}).value
      expect(next).to.deep.equal(put(authActions.loginFailure('login failed')))
    })
  })
})
