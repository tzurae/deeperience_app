// @flow
'use strict'
import type { ThunkAction, Action } from '../../lib/types'

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
  TOGGLE_SIDEBAR,

  TOGGLE_MAP_MODE,
  TOGGLE_CONTENT_MODE,

  SWITCH_DISPLAY_INFO_CARD,
  PRESS_MARKER_FAILURE,
} = require('../../lib/constants').default

export function getAllTrip():Action {
  return {
    type: GET_ALL_TRIP,
  }
}

export function getAllTripSuccess(res: any):Action {
  return {
    type: GET_ALL_TRIP_SUCCESS,
    payload: res,
  }
}

export function getAllTripFailure(res: any):Action {
  return {
    type: GET_ALL_TRIP_FAILURE,
    payload: res,
  }
}

export function getTripByClass():Action {
  return {
    type: GET_TRIP_BY_CLASS,
  }
}

export function getTripContent(res: string):Action {
  return {
    type: GET_TRIP_CONTENT,
    payload: { tripId: res },
  }
}

export function getTripContentSuccess(res:any):Action {
  return {
    type: GET_TRIP_CONTENT_SUCCESS,
    payload: res,
  }
}

export function getTripContentFailure(res:any):Action {
  return {
    type: GET_TRIP_CONTENT_FAILURE,
    payload: res,
  }
}

export function setTripKey(res:any):Action {
  return {
    type: SET_TRIP_KEY,
    payload: res,
  }
}

export function setTripKeyWrapper(res: any):ThunkAction {
  return dispatch => dispatch(setTripKey(res))
}

export function setSiteContentSuccess(res:any):Action {
  return {
    type: SET_SITE_CONTENT_SUCCESS,
    payload: res,
  }
}

export function setSiteContentFailure(res:any):Action {
  return {
    type: SET_SITE_CONTENT_FAILURE,
    payload: res,
  }
}

export function setSiteStatus(res:any):Action {
  return {
    type: SET_SITE_STATUS,
    payload: res,
  }
}

export function setSiteStatusWrapper(res: any):ThunkAction {
  return dispatch => dispatch(setSiteStatus(res))
}

export function activateSiteBtn(res: any):Action {
  return {
    type: ACTIVATE_SITE_BTN,
    payload: res,
  }
}

export function activateSiteBtnWrapper(res: any):ThunkAction {
  return dispatch => dispatch(activateSiteBtn(res))
}

export function deactivateSiteBtn():Action {
  return {
    type: DEACTIVATE_SITE_BTN,
  }
}

export function deactivateSiteBtnWrapper():ThunkAction {
  return dispatch => dispatch(deactivateSiteBtn())
}

export function setDisplayInfo(res: any):Action {
  return {
    type: SET_DISPLAY_INFO,
    payload: {
      title: res.title,
      introduction: res.introduction,
    },
  }
}
export function setDisplayInfoWrapper(res: any):ThunkAction {
  return dispatch => dispatch(setDisplayInfo(res))
}

export function closeDisplayInfo():Action {
  return {
    type: CLOSE_DISPLAY_INFO,
  }
}

export function closeDisplayInfoWrapper():ThunkAction {
  return dispatch => dispatch(closeDisplayInfo())
}

export function getDisplayInfoDirectionStart(res: any):Action {
  return {
    type: GET_DISPLAY_INFO_DIRECTION_START,
    payload: res,
  }
}

export function setDisplayInfoTransit():Action {
  return {
    type: SET_DISPLAY_INFO_TRANSIT,
  }
}

export function setDisplayInfoTransitSuccess(res:any):Action {
  return {
    type: SET_DISPLAY_INFO_TRANSIT_SUCCESS,
    payload: res,
  }
}

export function setDisplayInfoTransitFailure(res:any):Action {
  return {
    type: SET_DISPLAY_INFO_TRANSIT_FAILURE,
    payload: res,
  }
}

export function setMapInfo(res : any):Action {
  return {
    type: SET_MAP_INFO,
    payload: res,
  }
}

export function setMapInfoWrapper(res: any):ThunkAction {
  return dispatch => dispatch(setMapInfo(res))
}

export function setMapInfoSuccess():Action {
  return {
    type: SET_MAP_INFO_SUCCESS,
  }
}

export function setMapInfoSuccessWrapper(res: any):ThunkAction {
  return dispatch => dispatch(setMapInfoSuccess(res))
}

export function setMapInfoFailure(res : any):Action {
  return {
    type: SET_MAP_INFO_FAILURE,
    payload: res,
  }
}

export function setMapInfoFailureWrapper(res: any):ThunkAction {
  return dispatch => dispatch(setMapInfoFailure(res))
}

export function setMapDirection(res : any):Action {
  return {
    type: SET_MAP_DIRECTION,
    payload: res,
  }
}

export function setMapDirectionSuccess(res : any):Action {
  return {
    type: SET_MAP_DIRECTION_SUCCESS,
    payload: res,
  }
}

export function setMapDirectionFailure(res : any):Action {
  return {
    type: SET_MAP_DIRECTION_FAILURE,
    payload: res,
  }
}

export function setAudio(res : any):Action {
  return {
    type: SET_AUDIO,
    payload: res,
  }
}

export function setAudioWrapper(res: any):ThunkAction {
  return dispatch => dispatch(setAudio(res))
}

export function resetAudio():Action {
  return {
    type: RESET_AUDIO,
  }
}

export function resetAudioWrapper():ThunkAction {
  return dispatch => dispatch(resetAudio())
}

export function switchDisplayInfoCard(which: number):Action {
  return {
    type: SWITCH_DISPLAY_INFO_CARD,
    payload: which,
  }
}

export function switchDisplayInfoCardWrapper(res: number):ThunkAction {
  return dispatch => dispatch(switchDisplayInfoCard(res))
}

export function pressMarkerFailure(res: any):Action {
  return {
    type: PRESS_MARKER_FAILURE,
    payload: res,
  }
}

export function pressMarkerFailureWrapper(res: any):ThunkAction {
  return dispatch => dispatch(pressMarkerFailure(res))
}

export function toggleDisplayInfo():Action {
  return {
    type: TOGGLE_DISPLAY_INFO,
  }
}

export function toggleDisplayInfoWrapper():ThunkAction {
  return dispatch => dispatch(toggleDisplayInfo())
}

export function toggleMapMode():Action {
  return {
    type: TOGGLE_MAP_MODE,
  }
}

export function toggleMapModeWrapper():ThunkAction {
  return dispatch => dispatch(toggleMapMode())
}

export function toggleContentMode():Action {
  return {
    type: TOGGLE_CONTENT_MODE,
  }
}

export function toggleContentModeWrapper():ThunkAction {
  return dispatch => dispatch(toggleContentMode())
}

export function toggleSidebar():Action {
  return {
    type: TOGGLE_SIDEBAR,
  }
}

export function toggleSidebarWrapper():ThunkAction {
  return dispatch => dispatch(toggleSidebar())
}

