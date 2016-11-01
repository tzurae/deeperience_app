'use strict'

import apiInterface from './apiInterface'
import UniFetch from '../lib/uniFetch'
import { appAuthToken } from '../reducers/auth/authToken'

export default class Mongodb extends apiInterface {
  initAuth() {
    return appAuthToken.getSessionToken()
  }

  getProvider(provider) {
  }

  fblogin(token) {
  }

  signup({ email, password, username }) {
    return UniFetch({
      method: 'POST',
      path: '/api/users',
      body: {
        name: username,
        email, password,
      },
    }).then(({ user }) => user)
  }

  login({ email, password }) {
    // return fetch('http://localhost:3000/api/users/login', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email, password,
    //   }),
    // }).then(res => res.json())
    return UniFetch({
      method: 'POST',
      path: '/api/users/login',
      body: {
        email, password,
      },
    })
  }

  logout() {
    return UniFetch({
      method: 'GET',
      path: '/api/users/login',
    })
  }

  resetPassword(email) {
  }
}
