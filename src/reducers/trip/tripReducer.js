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

  SET_DISPLAY_INFO,
  SET_STATE,
  CLOSE_DISPLAY_INFO,

  ACTIVATE_SITE_BTN,
  DEACTIVATE_SITE_BTN,
} = require('../../lib/constants').default

const initialState = new InitialState()

export default function tripReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)
  let tripInfo
  switch (action.type) {
    case GET_ALL_TRIP:
      return state

    case GET_TRIP_BY_CLASS:
      return state

    case GET_TRIP_CONTENT_SUCCESS:
      const { guideId, name, startSites } = action.payload
      return state.setIn(['tripContent', 'guideId'], guideId)
                  .setIn(['tripContent', 'name'], name)
                  .setIn(['tripContent', 'startSites'], startSites)

    case GET_TRIP_CONTENT_FAILURE:
      return state.setIn(['isFetching'], false)
                  .setIn(['error'], action.payload)

    case GET_TRIP_CONTENT:
      return state.setIn(['isFetching'], true)

    case SET_SITE_CONTENT_SUCCESS:
      return state.setIn(['tripContent', 'tripInfo'], action.payload)
                  .setIn(['isFetching'], false)

    case SET_SITE_CONTENT_FAILURE:
      return state.setIn(['isFetching'], false)
                  .setIn(['error'], action.payload)

    case SET_DISPLAY_INFO:
      const { title, introduction } = action.payload
      return state.setIn(['displayInfo', 'displayInfoTitle'], title)
                  .setIn(['displayInfo', 'displayInfoIntroduction'], introduction)
                  .setIn(['displayInfo', 'display'], true)

    case CLOSE_DISPLAY_INFO:
      return state.setIn(['displayInfo', 'display'], false)

    case ACTIVATE_SITE_BTN:
      tripInfo = state.getIn(['tripContent', 'tripInfo'])
      tripInfo[action.payload.day].sites[action.payload.order].active = true
      return state.setIn(['tripContent', 'tripInfo'], tripInfo)
    case DEACTIVATE_SITE_BTN:
      tripInfo = state.getIn(['tripContent', 'tripInfo'])
      tripInfo[action.payload.day].sites.forEach(site => {
        site.active = false
      })
      return state.setIn(['tripContent', 'tripInfo'], tripInfo)
    case SET_STATE:
      return state
  }

  return state
}
