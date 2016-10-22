/**
 * # authReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 * The InitialState for auth
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
import InitialState from './mainInitialState'

const {
  SET_STATE,

  SET_FEE,
  RESIDENT_FEE,
  ALL_FEE,
} = require('../../lib/constants').default

const initialState = new InitialState()

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    case SET_FEE:
      if (action.payload.type === RESIDENT_FEE) {
        return state.setIn(['residentFee'], action.payload.fee)
      } else if (action.payload.type === ALL_FEE) {
        return state.setIn(['allFee'], action.payload.fee)
      }
      return state
    case SET_STATE:
      return state
  }
  return state
}
