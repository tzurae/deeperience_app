// @flow
'use strict'
import type { Action } from '../../lib/types'
const {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE,
} = require('../../lib/constants').default

/**
 * ## retreiving profile actions
 */
export function getProfileRequest():Action {
  return {
    type: GET_PROFILE_REQUEST,
  }
}
export function getProfileSuccess(json:any):Action {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: json,
  }
}
export function getProfileFailure(json:any):Action {
  return {
    type: GET_PROFILE_FAILURE,
    payload: json,
  }
}
/**
 * ## State action controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
// export function getProfile(sessionToken) {
//   return dispatch => {
//     dispatch(getProfileRequest())
//     // store or get a sessionToken
//     return new AppAuthToken().getSessionToken(sessionToken)
//       .then((token) => {
//         return BackendFactory(token).getProfile()
//       })
//       .then((json) => {
//         dispatch(getProfileSuccess(json))
//       })
//       .catch((error) => {
//         dispatch(getProfileFailure(error))
//       })
//   }
// }
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function profileUpdateRequest():Action {
  return {
    type: PROFILE_UPDATE_REQUEST,
  }
}
export function profileUpdateSuccess():Action {
  return {
    type: PROFILE_UPDATE_SUCCESS,
  }
}
export function profileUpdateFailure(json:any):Action {
  return {
    type: PROFILE_UPDATE_FAILURE,
    payload: json,
  }
}
/**
 * ## updateProfile
 * @param {string} userId -  objectId
 * @param {string} username - the users name
 * @param {string] email - user's email
 * @param {Object} sessionToken - the sessionToken from Parse.com
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, Parse.com is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on Parse.com
 *
 */
// export function updateProfile(userId, username, email, sessionToken) {
//   return dispatch => {
//     dispatch(profileUpdateRequest())
//     return new AppAuthToken().getSessionToken(sessionToken)
//       .then((token) => {
//         return BackendFactory(token).updateProfile(userId,
//           {
//             username: username,
//             email: email,
//           }
//         )
//       })
//       .then(() => {
//         dispatch(profileUpdateSuccess())
//         dispatch(getProfile())
//       })
//       .catch((error) => {
//         dispatch(profileUpdateFailure(error))
//       })
//   }
// }
/**
 * ## onProfileFormFieldChange
 *
 */
export function onProfileFormFieldChange(field:string, value:string):Action {
  return {
    type: ON_PROFILE_FORM_FIELD_CHANGE,
    payload: { field, value },
  }
}
