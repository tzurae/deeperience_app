// @flow
'use strict'
import Firebase from '../../api/firebase'
import type { Action, ThunkAction } from '../../lib/types'

const {

  INIT_AUTH,
  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_START,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_START,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SOCIAL,

  ON_AUTH_FORM_FIELD_CHANGE,

  SIGNUP_START,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_START,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  TOGGLE_REGISTER_CHECKED,
  FB_LOGIN_START,

} = require('../../lib/constants').default

export function initAuth():Action {
  return {
    type: INIT_AUTH,
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
export function logoutFailure(error: any):Action {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  }
}

export function logout():Action {
  return {
    type: LOGOUT_START, //redux saga action
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
export function signupSuccess(user:any):Action {
  return {
    type: SIGNUP_SUCCESS,
    payload: user,
  }
}
export function signupFailure(error:any):Action {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  }
}

export function signup(username:string, email:string, password:string):Action {
  return {
    type: SIGNUP_START, // redux-saga actions
    payload: {
      username,
      email,
      password,
    },
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

export function login(email:string, password:string):Action {
  return {
    type: LOGIN_START,
    payload: {
      email,
      password,
    },
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
 */
export function resetPassword(email:string):Action {
  return {
    type: RESET_PASSWORD_START,
    payload: {
      email,
    },
  }
}

export function toggleRegisterChecked():Action {
  return {
    type: TOGGLE_REGISTER_CHECKED,
  }
}

export function toggleRegisterCheckedWrapper():ThunkAction {
  return dispatch => dispatch(toggleRegisterChecked())
}

export function facebookLogin(token: string):Action {
  return {
    type: FB_LOGIN_START,
    payload: token,
  }
}
