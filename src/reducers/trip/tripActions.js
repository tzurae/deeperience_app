// @flow
'use strict'
import ApiFactory from '../../api/apiFactory'
import type { ThunkAction, Action } from '../../lib/types'
import { promiseFor } from '../../lib/util'
import { calculateTripInfo } from './tripHelper'

const {
  GET_ALL_TRIP,
  GET_TRIP_BY_CLASS,
  GET_TRIP_CONTENT,
  GET_TRIP_CONTENT_SUCCESS,
  GET_TRIP_CONTENT_FAILURE,
  SET_SITE_CONTENT_SUCCESS,
  SET_SITE_CONTENT_FAILURE,

  SET_DISPLAY_INFO,
  CLOSE_DISPLAY_INFO,

  ACTIVATE_SITE_BTN,
  DEACTIVATE_SITE_BTN,

  SET_NOW_POSITION,
  SET_MAP_INFO,
  SET_MAP_DIRECTION,
} = require('../../lib/constants').default

export function getAllTrip():Action {
  return {
    type: GET_ALL_TRIP,
  }
}

export function getTripByClass():Action {
  return {
    type: GET_TRIP_BY_CLASS,
  }
}

export function getTripContent():Action {
  return {
    type: GET_TRIP_CONTENT,
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

export function getTripContentById(tripId:string):ThunkAction {
  return dispatch => {
    dispatch(getTripContent())

    return new ApiFactory().readDataBaseOnce(`/trips/${tripId}`)
      .then(res => {
        dispatch(getTripContentSuccess(res.val()))
        const allSitesKey = res.val().allSites
        const { routes, startSites } = res.val()

        promiseFor(
          (index) => { return index < allSitesKey.length },
          (index, payload) => {
            return new ApiFactory()
                        .readDataBaseOnce(`/site/${allSitesKey[index]}`)
                        .then((res) => {
                          payload[allSitesKey[index]] = res.val()
                          return payload
                        })
          },
          0,
          (allSites) => {
            dispatch(
              setSiteContentSuccess(
                calculateTripInfo(routes, startSites, allSites)
              )
            )
          }
          ,
          (err) => { dispatch(setSiteContentFailure(err)) },
          {}
        )
      })
      .catch((error) => {
        dispatch(getTripContentFailure(error))
      })
  }
}
export function activateSiteBtn(res: any):Action {
  return {
    type: ACTIVATE_SITE_BTN,
    payload: res,
  }
}

export function deactivateSiteBtn():Action {
  return {
    type: DEACTIVATE_SITE_BTN,
  }
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

export function closeDisplayInfo():Action {
  return {
    type: CLOSE_DISPLAY_INFO,
  }
}

export function setNowPosition(res:any):Action {
  return {
    type: SET_NOW_POSITION,
    payload: res,
  }
}

export function getNowPosition(resolve: any):ThunkAction {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude, heading } = position.coords
      dispatch(setNowPosition({ position: { lat: latitude, lng: longitude }, heading }))
      resolve()
    },
      error => console.log(error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    )
  }
}

export function setMapInfo(res : any):Action {
  return {
    type: SET_MAP_INFO,
    payload: res,
  }
}

export function setMapDirection(res : any):Action {
  return {
    type: SET_MAP_DIRECTION,
    payload: res,
  }
}
