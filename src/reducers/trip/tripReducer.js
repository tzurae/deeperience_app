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
  SET_SITE_CONTENT_SUCCESS,
  SET_SITE_CONTENT_FAILURE,

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
      const { guideId, name, routes, startSites } = action.payload
      return state.setIn(['tripContent', 'guideId'], guideId)
                  .setIn(['tripContent', 'name'], name)
                  .setIn(['tripContent', 'routes'], routes)
                  .setIn(['tripContent', 'startSites'], startSites)

    case GET_TRIP_CONTENT_FAILURE:
      return state.setIn(['isFetching'], false)
                  .setIn(['error'], action.payload)

    case GET_TRIP_CONTENT:
      return state.setIn(['isFetching'], true)

    case SET_SITE_CONTENT_SUCCESS:
      const { sitePosition } = action.payload

      return state.setIn(['tripContent', 'sitePosition'], sitePosition)
                  .setIn(['isFetching'], false)

    case SET_SITE_CONTENT_FAILURE:
      return state.setIn(['isFetching'], false)
                  .setIn(['error'], action.payload)

    case SET_STATE:
      return state
  }

  return state
}
