/**
 * # tripReducer.js
 *
 * The reducer for all the actions about trip
 */
'use strict'
import InitialState from './tripInitialState'

const {
  GET_ALL_TRIP,
  GET_ALL_TRIP_SUCCESS,
  GET_ALL_TRIP_FAILURE,
  GET_TRIP_BY_CLASS,

  SET_TRIP_KEY,

  GET_TRIP_CONTENT,
  GET_TRIP_CONTENT_SUCCESS,
  GET_TRIP_CONTENT_FAILURE,
  SET_SITE_CONTENT_SUCCESS,
  SET_SITE_CONTENT_FAILURE,

  SET_SITE_STATUS,

  SET_DISPLAY_INFO,
  SET_STATE,
  CLOSE_DISPLAY_INFO,

  ACTIVATE_SITE_BTN,
  DEACTIVATE_SITE_BTN,

  SET_MAP_INFO,
  SET_MAP_INFO_SUCCESS,
  SET_MAP_INFO_FAILURE,
  SET_MAP_DIRECTION,
  SET_MAP_DIRECTION_ERROR,

  SET_AUDIO,
  RESET_AUDIO,

  SET_DISPLAY_INFO_TRANSIT,
  SET_DISPLAY_INFO_TRANSIT_SUCCESS,
  SET_DISPLAY_INFO_TRANSIT_FAILURE,
  TOGGLE_DISPLAY_INFO,
  TOGGLE_SIDEBAR,

  TOGGLE_MAP_MODE,
  TOGGLE_CONTENT_MODE,

  SWITCH_DISPLAY_INFO_CARD,

  PRESS_MARKER_FAILURE,

} = require('../../lib/constants').default

const initialState = new InitialState()

export default function tripReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)
  let siteStatus
  let nowState
  let order
  const displayDay = state.getIn(['displayInfo', 'displayDay'])
  const displayWhich = state.getIn(['displayInfo', 'displayWhich'])
  switch (action.type) {
    case GET_ALL_TRIP:
      return state.setIn(['main', 'isFetching'], true)

    case GET_ALL_TRIP_SUCCESS:
      return state.setIn(['main', 'isFetching'], false)
                  .setIn(['main', 'tripContent'], action.payload)

    case GET_ALL_TRIP_FAILURE:
      return state.setIn(['main', 'isFetching'], false)
                  .setIn(['error'], action.payload)

    case GET_TRIP_BY_CLASS:
      return state

    case SET_TRIP_KEY:
      return state.setIn(['tripContent', 'tripKey'], action.payload)

    case GET_TRIP_CONTENT_SUCCESS:
      const { guideId, name, startSites } = action.payload
      return state.setIn(['tripContent', 'guideId'], guideId)
                  .setIn(['tripContent', 'name'], name)
                  .setIn(['tripContent', 'startSites'], startSites)

    case GET_TRIP_CONTENT_FAILURE:
      return state.setIn(['tripContent', 'isFetching'], false)
                  .setIn(['error'], action.payload)

    case GET_TRIP_CONTENT:
      return state.setIn(['tripContent', 'isFetching'], true)

    case SET_SITE_CONTENT_SUCCESS:
      return state.setIn(['tripContent', 'tripInfo'], action.payload.allInfo)
                  .setIn(['tripContent', 'siteStatus'], action.payload.siteStatus)
                  .setIn(['tripContent', 'isFetching'], false)

    case SET_SITE_CONTENT_FAILURE:
      return state.setIn(['tripContent', 'isFetching'], false)
                  .setIn(['error'], action.payload)

    case SET_SITE_STATUS:
      return state.setIn(['tripContent', 'siteStatus'], action.payload)

    case SET_DISPLAY_INFO:
      const { title, introduction } = action.payload
      return state.setIn(['displayInfo', 'displayInfoTitle'], title)
                  .setIn(['displayInfo', 'displayInfoIntroduction'], introduction)
                  .setIn(['displayInfo', 'display'], true)

    case CLOSE_DISPLAY_INFO:
      return state.setIn(['displayInfo', 'display'], false)
                  .setIn(['displayInfo', 'displayMode'], false)

    case ACTIVATE_SITE_BTN:
      siteStatus = state.getIn(['tripContent', 'siteStatus'])
      order = action.payload.order
      if (siteStatus[displayDay][order] === 1) siteStatus[displayDay][order] = 2
      else if (siteStatus[displayDay][order] === 3) siteStatus[displayDay][order] = 4
      else if (siteStatus[displayDay][order] === 5) siteStatus[displayDay][order] = 6
      return state.setIn(['tripContent', 'siteStatus'], siteStatus)
                  .setIn(['displayInfo', 'displayWhich'], order)

    case DEACTIVATE_SITE_BTN:
      siteStatus = state.getIn(['tripContent', 'siteStatus'])
      if (siteStatus[displayDay][displayWhich] === 2) siteStatus[displayDay][displayWhich] = 1
      else if (siteStatus[displayDay][displayWhich] === 4) siteStatus[displayDay][displayWhich] = 3 // pioneer sitesite
      else if (siteStatus[displayDay][displayWhich] === 6) siteStatus[displayDay][displayWhich] = 5 // frontier sitesite
      return state.setIn(['tripContent', 'siteStatus'], siteStatus)
                  .setIn(['displayInfo', 'transit', 'fetched'], false)

    case SET_MAP_INFO:
      return state.setIn(['mapInfo', 'headerText'], action.payload.content.name)
                  .setIn(['mapInfo', 'mainTitle'], action.payload.content.name)
                  .setIn(['mapInfo', 'subTitle'], action.payload.content.mapSite[0].name)
                  .setIn(['mapInfo', 'content'], action.payload.content.mapSite[0].introduction)
                  .setIn(['mapInfo', 'pos'], action.payload.content.mapSite[0].position)
                  .setIn(['mapInfo', 'markers'], action.payload.content.mapSite)
                  .setIn(['mapInfo', 'address'], action.payload.content.mapSite[0].address)
                  .setIn(['mapInfo', 'isFetching'], true)

    case SET_MAP_INFO_SUCCESS:
      return state.setIn(['mapInfo', 'isFetching'], false)

    case SET_MAP_INFO_FAILURE:
      return state.setIn(['mapInfo', 'isFetching'], false)
                  .setIn(['error'], action.payload)

    case SET_MAP_DIRECTION:
      return state.setIn(['mapInfo', 'mainTitle'], action.payload.name)
                  .setIn(['mapInfo', 'subTitle'], action.payload.name)
                  .setIn(['mapInfo', 'content'], action.payload.introduction)
                  .setIn(['mapInfo', 'polyline'], action.payload.polyline)
                  .setIn(['mapInfo', 'distance'], action.payload.distance)

    case SET_AUDIO:
      let newState = state
      const { audioURL, audioDuration, audioPosition } = action.payload
      if (audioURL) newState = newState.setIn(['mapInfo', 'audioURL'], audioURL)
      if (audioDuration && audioDuration > 0) newState = newState.setIn(['mapInfo', 'audioDuration'], audioDuration)
      if (audioPosition) newState = newState.setIn(['mapInfo', 'audioPosition'], audioPosition)
      return newState

    case RESET_AUDIO:
      return state.setIn(['mapInfo', 'audioURL'], '')
                  .setIn(['mapInfo', 'audioPosition'], 0)
                  .setIn(['mapInfo', 'audioDuration'], 1)

    case SET_DISPLAY_INFO_TRANSIT:
      return state.setIn(['displayInfo', 'transit', 'isFetching'], true)

    case SET_DISPLAY_INFO_TRANSIT_SUCCESS:
      const {
        departureTime,
        arrivalTime,
        duration,
        steps,
        fare,
      } = action.payload
      return state.setIn(['displayInfo', 'transit', 'departureTime'], departureTime)
                  .setIn(['displayInfo', 'transit', 'arrivalTime'], arrivalTime)
                  .setIn(['displayInfo', 'transit', 'duration'], duration)
                  .setIn(['displayInfo', 'transit', 'steps'], steps)
                  .setIn(['displayInfo', 'transit', 'fare'], fare)
                  .setIn(['displayInfo', 'transit', 'isFetching'], false)
                  .setIn(['displayInfo', 'transit', 'fetched'], true)

    case SET_DISPLAY_INFO_TRANSIT_FAILURE:
      return state.setIn(['displayInfo', 'transit', 'isFetching'], false)
                  .setIn(['error'], action.payload)

    case TOGGLE_DISPLAY_INFO:
      nowState = state.getIn(['displayInfo', 'displayMode'])
      return state.setIn(['displayInfo', 'displayMode'], !nowState)

    case TOGGLE_SIDEBAR:
      nowState = state.getIn(['displayInfo', 'sidebarDisplayMode'])
      return state.setIn(['displayInfo', 'sidebarDisplayMode'], !nowState)

    case TOGGLE_MAP_MODE:
      nowState = state.getIn(['mapInfo', 'mapDisplayMode'])
      return state.setIn(['mapInfo', 'mapDisplayMode'], !nowState)

    case TOGGLE_CONTENT_MODE:
      nowState = state.getIn(['mapInfo', 'contentDisplayMode'])
      return state.setIn(['mapInfo', 'contentDisplayMode'], !nowState)

    case SET_MAP_DIRECTION_ERROR:
      return state.setIn(['error'], action.payload)

    case SWITCH_DISPLAY_INFO_CARD:
      return state.setIn(['displayInfo', 'displayWhichCard'], action.payload)

    case PRESS_MARKER_FAILURE:
      return state.setIn(['error'], action.payload)

    case SET_STATE:
      return state
  }

  return state
}
