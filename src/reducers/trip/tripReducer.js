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

  SET_MAP_INFO,
  SET_MAP_DIRECTION,
  SET_MAP_DIRECTION_ERROR,

  SET_AUDIO_DURATION,
  SET_AUDIO_POSITION,

  SET_DISPLAY_INFO_TRANSIT,
  GET_DISPLAY_INFO_DIRECTION_ERROR,

  SWITCH_DISPLAY_INFO_CARD,
} = require('../../lib/constants').default

const initialState = new InitialState()

export default function tripReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)
  let siteStatus
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
      return state.setIn(['tripContent', 'tripInfo'], action.payload.allInfo)
                  .setIn(['tripContent', 'siteStatus'], action.payload.siteStatus)
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
      siteStatus = state.getIn(['tripContent', 'siteStatus'])
      siteStatus[action.payload.day][action.payload.order] = 1
      return state.setIn(['tripContent', 'siteStatus'], siteStatus)
                  .setIn(['displayInfo', 'displayWhich'], action.payload.order)

    case DEACTIVATE_SITE_BTN:
      siteStatus = state.getIn(['tripContent', 'siteStatus'])
      const displayDay = state.getIn(['displayInfo', 'displayDay'])
      const displayWhich = state.getIn(['displayInfo', 'displayWhich'])
      siteStatus[displayDay][displayWhich] = 0
      return state.setIn(['tripContent', 'siteStatus'], siteStatus)

    case SET_MAP_INFO:
      return state.setIn(['mapInfo', 'headerText'], action.payload.content.name)
                  .setIn(['mapInfo', 'mainTitle'], action.payload.content.name)
                  .setIn(['mapInfo', 'subTitle'], action.payload.content.mapSite[0].name)
                  .setIn(['mapInfo', 'content'], action.payload.content.mapSite[0].introduction)
                  .setIn(['mapInfo', 'pos'], action.payload.content.mapSite[0].position)
                  .setIn(['mapInfo', 'markers'], action.payload.content.mapSite)
                  .setIn(['mapInfo', 'address'], action.payload.content.mapSite[0].address)

    case SET_MAP_DIRECTION:
      return state.setIn(['mapInfo', 'mainTitle'], action.payload.name)
                  .setIn(['mapInfo', 'subTitle'], action.payload.name)
                  .setIn(['mapInfo', 'content'], action.payload.introduction)
                  .setIn(['mapInfo', 'address'], action.payload.address)
                  .setIn(['mapInfo', 'polyline'], action.payload.polyline)
                  .setIn(['mapInfo', 'distance'], action.payload.distance)

    case SET_AUDIO_DURATION:
      return state.setIn(['mapInfo', 'audioDuration'], action.payload)

    case SET_AUDIO_POSITION:
      return state.setIn(['mapInfo', 'audioPosition'], action.payload)

    case SET_DISPLAY_INFO_TRANSIT:
      const {
        departureTime,
        arrivalTime,
        duration,
        steps,
        fare,
      } = action.payload
      console.log(action.payload)
      return state.setIn(['displayInfo', 'transit', 'departureTime'], departureTime)
                  .setIn(['displayInfo', 'transit', 'arrivalTime'], arrivalTime)
                  .setIn(['displayInfo', 'transit', 'duration'], duration)
                  .setIn(['displayInfo', 'transit', 'steps'], steps)
                  .setIn(['displayInfo', 'transit', 'fare'], fare)

    case SET_MAP_DIRECTION_ERROR:
    case GET_DISPLAY_INFO_DIRECTION_ERROR:
      return state.setIn(['error'], action.payload)

    case SWITCH_DISPLAY_INFO_CARD:
      return state.setIn(['displayInfo', 'displayWhichCard'], action.payload)

    case SET_STATE:
      return state
  }

  return state
}
