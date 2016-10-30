'use strict'

import apiInterface from './apiInterface'
import { auth as Config } from '../config'

const DOMAIN = Config.mongodb.domain

export default class Mongodb extends apiInterface {
  initAuth() {
  }

  getProvider(provider) {
  }

  fblogin(token) {
  }

  signup({ email, password, username }) {
    return fetch(`${DOMAIN}/api/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        email, password,
      }),
    }).then(res => res.json())
      .then(({ user }) => user)
  }

  login({ email, password }) {
    return fetch(`${DOMAIN}/api/users/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password,
      }),
    }).then(res => res.json())
  }

  logout() {
    return fetch(`${DOMAIN}/api/users/login`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  resetPassword(email) {
  }
}
