'use strict'
import { Actions } from 'react-native-router-flux'
import ApiFactory from '../../api/apiFactory'
import Firebase from '../../api/firebase'
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

export function initAuth() {
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

export function logoutState() {
  return {
    type: LOGOUT,
  }
}
export function registerState() {
  return {
    type: REGISTER,
  }
}

export function loginState() {
  return {
    type: LOGIN,
  }
}

export function forgotPasswordState() {
  return {
    type: FORGOT_PASSWORD,
  }
}

/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  }
}
export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  }
}
export function logout() {
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
export function onAuthFormFieldChange(field, value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: { field, value },
  }
}
/**
 * ## Signup actions
 */
export function signupRequest() {
  return {
    type: SIGNUP_REQUEST,
  }
}
export function signupSuccess(json) {
  return {
    type: SIGNUP_SUCCESS,
    payload: json,
  }
}
export function signupFailure(error) {
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
export function signup(username, email, password) {
  return dispatch => {
    dispatch(signupRequest())
    return new ApiFactory().signup({
      email,
      password,
    })
      .then((json) => {
        ApiFactory().writeDataBase(`/users/${json.uid}`, { name: 'Rae', nickanme: 'John' })
        dispatch(signupSuccess(
          {
            uid: json.uid,
            name: json.displayName,
            email: json.email,
          }
            ))
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
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  }
}

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json,
  }
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  }
}
export function login(username,  password) {
  return dispatch => {
    dispatch(loginRequest())
    return new ApiFactory().login({
      username,
      password,
    })

      .then(json => {
        dispatch(loginSuccess(json))
            // navigate to Tabbar
        Actions.Tabbar()
            // dispatch(logoutState())
      })
      .catch((error) => {
        dispatch(loginFailure(error))
      })
  }
}

/**
 * ### Social Login Actions
 */
export function loginWithSocail(authProvider) {
  return {
    type: LOGIN_SOCIAL,
    payload: { authProvider },
  }
}

export function loginWithFacebook() {
  return LoginWithSocail(new Firebase.getProvider('facebook'))
}

export function loginWithGoogle() {
  return LoginWithSocail(new Firebase.getProvider('google'))
}

/**
 * ## ResetPassword actions
 */
export function resetPasswordRequest() {
  return {
    type: RESET_PASSWORD_REQUEST,
  }
}

export function resetPasswordSuccess() {
  return {
    type: RESET_PASSWORD_SUCCESS,
  }
}

export function resetPasswordFailure(error) {
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
export function resetPassword(email) {
  return dispatch => {
    dispatch(resetPasswordRequest())
    return ApiFactory().resetPassword({
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
