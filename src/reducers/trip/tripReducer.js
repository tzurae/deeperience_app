/**
 * # tripReducer.js
 *
 * The reducer for all the actions about trip
 */
'use strict'

const InitialState = require('./tripInitialState').default

const {
  GET_ALL_TRIP,
  GET_TRIP_BY_CLASS,
  GET_TRIP_CONTENT,
  GET_TRIP_CONTENT_SUCCESS,
  GET_TRIP_CONTENT_FAILURE,

  SET_STATE,
} = require('../../lib/constants').default

const initialState = new InitialState()
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function tripReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    case GET_ALL_TRIP:
      return state
    case GET_TRIP_BY_CLASS:
      return state
    case GET_TRIP_CONTENT:
    case GET_TRIP_CONTENT_SUCCESS:
    case GET_TRIP_CONTENT_FAILURE:
      return state
    case SET_STATE:
      return state
  }
  /**
   * ## Default
   */
  return state
}
