// @flow weak
'use strict'

const {
  GET_BUY_TRIP,
  GET_BUY_TRIP_SUCCESS,
  GET_BUY_TRIP_FAILURE,
  GET_TRIP_BY_CLASS,

  SET_TRIP_KEY,

  SET_TRIP_CONTENT,
  SET_TRIP_CONTENT_SUCCESS,
  SET_TRIP_CONTENT_FAILURE,

  SET_SITE_STATUS,

  SET_DISPLAY_INFO,
  CLOSE_DISPLAY_INFO,

  ACTIVATE_SITE_BTN,
  DEACTIVATE_SITE_BTN,

  SET_MAP_INFO,
  SET_MAP_INFO_SUCCESS,
  SET_MAP_INFO_FAILURE,
  SET_MAP_DIRECTION,
  SET_MAP_DIRECTION_SUCCESS,
  SET_MAP_DIRECTION_FAILURE,

  SET_AUDIO,
  RESET_AUDIO,

  GET_DISPLAY_INFO_DIRECTION_START,

  SET_DISPLAY_INFO_TRANSIT,
  SET_DISPLAY_INFO_TRANSIT_SUCCESS,
  SET_DISPLAY_INFO_TRANSIT_FAILURE,
  TOGGLE_DISPLAY_INFO,

  SWITCH_DISPLAY_INFO_CARD,
  PRESS_MARKER_FAILURE,
} = require('../../lib/constants').default

export function getBuyTrip() {
  return {
    type: GET_BUY_TRIP,
  }
}

export function getBuyTripSuccess(res: any) {
  return {
    type: GET_BUY_TRIP_SUCCESS,
    payload: res,
  }
}

export function getBuyTripFailure(res: any) {
  return {
    type: GET_BUY_TRIP_FAILURE,
    payload: res,
  }
}

export function getTripByClass() {
  return {
    type: GET_TRIP_BY_CLASS,
  }
}

export function setTripContent(tripContent :any) {
  return {
    type: SET_TRIP_CONTENT,
    payload: tripContent,
  }
}

export function setTripContentSuccess(res:any) {
  return {
    type: SET_TRIP_CONTENT_SUCCESS,
    payload: res,
  }
}

export function setTripContentFailure(res:any) {
  return {
    type: SET_TRIP_CONTENT_FAILURE,
    payload: res,
  }
}

export function setTripKey(res:any) {
  return {
    type: SET_TRIP_KEY,
    payload: res,
  }
}

export function setSiteStatus(res:any) {
  return {
    type: SET_SITE_STATUS,
    payload: res,
  }
}

export function activateSiteBtn(res: any) {
  return {
    type: ACTIVATE_SITE_BTN,
    payload: res,
  }
}

export function deactivateSiteBtn() {
  return {
    type: DEACTIVATE_SITE_BTN,
  }
}

export function setDisplayInfo(res: any) {
  return {
    type: SET_DISPLAY_INFO,
    payload: {
      title: res.title,
      introduction: res.introduction,
    },
  }
}

export function closeDisplayInfo() {
  return {
    type: CLOSE_DISPLAY_INFO,
  }
}

export function getDisplayInfoDirectionStart(res: any) {
  return {
    type: GET_DISPLAY_INFO_DIRECTION_START,
    payload: res,
  }
}

export function setDisplayInfoTransit() {
  return {
    type: SET_DISPLAY_INFO_TRANSIT,
  }
}

export function setDisplayInfoTransitSuccess(res:any) {
  return {
    type: SET_DISPLAY_INFO_TRANSIT_SUCCESS,
    payload: res,
  }
}

export function setDisplayInfoTransitFailure(res:any) {
  return {
    type: SET_DISPLAY_INFO_TRANSIT_FAILURE,
    payload: res,
  }
}

export function setMapInfo(res : any) {
  return {
    type: SET_MAP_INFO,
    payload: res,
  }
}

export function setMapInfoSuccess() {
  return {
    type: SET_MAP_INFO_SUCCESS,
  }
}

export function setMapInfoFailure(res : any) {
  return {
    type: SET_MAP_INFO_FAILURE,
    payload: res,
  }
}

export function setMapDirection(res : any) {
  return {
    type: SET_MAP_DIRECTION,
    payload: res,
  }
}

export function setMapDirectionSuccess(res : any) {
  return {
    type: SET_MAP_DIRECTION_SUCCESS,
    payload: res,
  }
}

export function setMapDirectionFailure(res : any) {
  return {
    type: SET_MAP_DIRECTION_FAILURE,
    payload: res,
  }
}

export function setAudio(res : any) {
  return {
    type: SET_AUDIO,
    payload: res,
  }
}

export function resetAudio() {
  return {
    type: RESET_AUDIO,
  }
}

export function switchDisplayInfoCard(which: number) {
  return {
    type: SWITCH_DISPLAY_INFO_CARD,
    payload: which,
  }
}

export function pressMarkerFailure(res: any) {
  return {
    type: PRESS_MARKER_FAILURE,
    payload: res,
  }
}

export function toggleDisplayInfo() {
  return {
    type: TOGGLE_DISPLAY_INFO,
  }
}
