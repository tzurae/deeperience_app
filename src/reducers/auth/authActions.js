// @flow
'use strict'
import { Actions } from 'react-native-router-flux'
import ApiFactory from '../../api/apiFactory'
import Firebase from '../../api/firebase'
import type { ThunkAction, Action } from '../../lib/types'

import UserModel from '../../model/UserModel'

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SOCIAL,

  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

} = require('../../lib/constants').default

/**
 *  ## Initialize user auth when app start running
 */

export function initAuth():ThunkAction {
  return dispatch => {
    return new ApiFactory().initAuth()
      .then(
        user => {
          if (user) {
            dispatch(loginSuccess(user.json))
            Actions.Tabbar()
          } else {
            Actions.InitialLoginForm()
          }
        })
      .catch(
        error => {
          dispatch(loginFailure(error))
        }
      )
  }
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */

export function logoutState():Action {
  return {
    type: LOGOUT,
  }
}
export function registerState():Action {
  return {
    type: REGISTER,
  }
}

export function loginState():Action {
  return {
    type: LOGIN,
  }
}

export function forgotPasswordState():Action {
  return {
    type: FORGOT_PASSWORD,
  }
}

/**
 * ## Logout actions
 */
export function logoutRequest():Action {
  return {
    type: LOGOUT_REQUEST,
  }
}

export function logoutSuccess():Action {
  return {
    type: LOGOUT_SUCCESS,
  }
}
export function logoutFailure(error: any):Action { // TODO
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  }
}
export function logout():ThunkAction {
  return dispatch => {
    dispatch(logoutRequest())
    return new ApiFactory().logout()
      .then(() => {
        dispatch(loginState())
        dispatch(logoutSuccess())
        Actions.InitialLoginForm()
      })
      .catch((error) => {
        dispatch(loginState())
        dispatch(logoutFailure(error))
      })
  }
}
/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange(field:string, value:string):Action {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: { field, value },
  }
}
/**
 * ## Signup actions
 */
export function signupRequest():Action {
  return {
    type: SIGNUP_REQUEST,
  }
}
export function signupSuccess(json:any):Action { // TODO
  return {
    type: SIGNUP_SUCCESS,
    payload: json,
  }
}
export function signupFailure(error:any):Action { // TODO
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  }
}

/**
 * ## signup
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 */
export function signup(username:string, email:string, password:string):ThunkAction {
  return dispatch => {
    dispatch(signupRequest())
    return new ApiFactory().signup({
      email,
      password,
    })
      .then((json) => {
        const newUser = new UserModel(json.uid, {
          name: 'rae',
          nickname: null,
        })
        new ApiFactory().writeDataBase(newUser.getPath(), newUser.getData())
        dispatch(signupSuccess(
          {
            uid: json.uid,
            name: json.displayName,
            email: json.email,
          }))
        dispatch(logoutState())
            // navigate to Tabbar
        Actions.Tabbar()
      })
      .catch((error) => {
        dispatch(signupFailure(error))
      })
  }
}

/**
 * ### Normal Login Actions
 */
export function loginRequest():Action {
  return {
    type: LOGIN_REQUEST,
  }
}

export function loginSuccess(json:any):Action { // TODO
  return {
    type: LOGIN_SUCCESS,
    payload: json,
  }
}

export function loginFailure(error:any):Action { // TODO
  return {
    type: LOGIN_FAILURE,
    payload: error,
  }
}
export function login(email:string,  password:string):ThunkAction {
  return dispatch => {
    dispatch(loginRequest())
    return new ApiFactory().login({
      email,
      password,
    })
      .then(json => {
        dispatch(loginSuccess(json))
            // navigate to Tabbar
        Actions.Tabbar()
        dispatch(logoutState())
      })
      .catch((error) => {
        dispatch(loginFailure(error))
      })
  }
}

/**
 * ### Social Login Actions
 */
export function loginWithSocial(authProvider:any):Action { // TODO
  return {
    type: LOGIN_SOCIAL,
    payload: { authProvider },
  }
}

export function loginWithFacebook() {
  return loginWithSocial(new Firebase().getProvider('facebook'))
}

export function loginWithGoogle() {
  return loginWithSocial(new Firebase().getProvider('google'))
}

/**
 * ## ResetPassword actions
 */
export function resetPasswordRequest():Action {
  return {
    type: RESET_PASSWORD_REQUEST,
  }
}

export function resetPasswordSuccess():Action {
  return {
    type: RESET_PASSWORD_SUCCESS,
  }
}

export function resetPasswordFailure(error:any):Action { // TODO
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error,
  }
}
/**
 * ## ResetPassword
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on setting Parse.com
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
export function resetPassword(email:string):ThunkAction {
  return dispatch => {
    dispatch(resetPasswordRequest())
    return new ApiFactory().resetPassword({
      email,
    })
      .then(() => {
        dispatch(loginState())
        dispatch(resetPasswordSuccess())
        Actions.Login()
      })
      .catch((error) => {
        dispatch(resetPasswordFailure(error))
      })
  }
}
