/**
 * # tripReducer.js
 *
 * The reducer for all the actions about trip
 */
'use strict'

import InitialState from './tripInitialState'

const {
  GET_ALL_TRIP,
  GET_TRIP_BY_CLASS,
  GET_TRIP_CONTENT,
  GET_TRIP_CONTENT_SUCCESS,
  GET_TRIP_CONTENT_FAILURE,

  SET_STATE,
} = require('../../lib/constants').default

const initialState = new InitialState()

export default function tripReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    case GET_ALL_TRIP:
      return state
    case GET_TRIP_BY_CLASS:
      return state
    case GET_TRIP_CONTENT_SUCCESS:
      const { guideId, name, routes, startSite } = action.payload
      return state.setIn(['form', 'isFetching'], false)
                  .setIn(['form', 'trip', 'guideId'], guideId)
                  .setIn(['form', 'trip', 'name'], name)
                  .setIn(['form', 'trip', 'routes'], routes)
                  .setIn(['form', 'trip', 'startSite'], startSite)
    case GET_TRIP_CONTENT_FAILURE:
      return state.setIn(['form', 'isFetching'], false)
                  .setIn(['form', 'error'], action.payload)
    case GET_TRIP_CONTENT:
      return state.setIn(['form', 'isFetching'], true)
    case SET_STATE:
      return state
  }

  return state
}
