// @flow
'use strict'
import ApiFactory from '../../api/apiFactory'
import type { ThunkAction, Action } from '../../lib/types'
import { promiseFor } from '../../lib/util'
import { calculateTripInfo, convertPolyline } from './tripHelper'
import { auth } from '../../config'

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

  SET_MAP_INFO,
  SET_MAP_DIRECTION,
  SET_MAP_DIRECTION_ERROR,

  SET_AUDIO_DURATION,
  SET_AUDIO_POSITION,

  SET_DISPLAY_INFO_TRANSIT,
  GET_DISPLAY_INFO_DIRECTION_ERROR,

  SWITCH_DISPLAY_INFO_CARD,
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

export function getDisplayInfoDirectionError(err: any):Action {
  return {
    type: GET_DISPLAY_INFO_DIRECTION_ERROR,
    payload: err,
  }
}

export function getDisplayInfoDirection(mode: number, position: any):ThunkAction {
  return dispatch => {
    return getNowPosition().then(({ lat, lng }) => {
      let modeStr = 'transit'
      switch (mode) {
        case 0:
          modeStr = 'transit'
          break
        case 1:
          modeStr = 'driving'
          break
        case 2:
          modeStr = 'walking'
          break
        case 3:
          modeStr = 'bicycling'
          break
      }
      return fetch('https://maps.googleapis.com/maps/api/directions/json?' +
        `origin=${lat},${lng}` +
        `&destination=${position.lat},${position.lng}` +
        '&region=tw' +
        `&mode=${modeStr}` +
        '&language=zh-TW' +
        `&key=${auth.firebase.apiKey}`)
    }).then(res => res.json()).then(res => {
      if (mode === 0) {
        const departureTime = res.routes[0].legs[0].departure_time.text
        const arrivalTime = res.routes[0].legs[0].arrival_time.text
        const duration = res.routes[0].legs[0].duration.text
        const steps = res.routes[0].legs[0].steps
        const fare = res.routes[0].fare.text
        dispatch(setDisplayInfoTransit({
          departureTime,
          arrivalTime,
          duration,
          steps,
          fare,
        }))
      }
    }).catch(err => console.log(err))
  }
}

export function getMapInfoDirection(res :any):ThunkAction {
  return dispatch => {
    return getNowPosition().then(({ lat, lng }) => {
      return fetch('https://maps.googleapis.com/maps/api/directions/json?' +
        `origin=${lat},${lng}` +
        `&destination=${res.address}` +
        '&region=tw' +
        '&mode=walking' +
        '&language=zh-TW' +
        `&key=${auth.firebase.apiKey}`)
    }).then(res => res.json()).then(res => {
      const { name, introduction, address } = res
      const distance = res.routes[0].legs[0].distance.text
      const polyline = convertPolyline(res.routes[0].overview_polyline.points)
      dispatch(setMapDirection({
        polyline,
        name,
        introduction,
        address,
        distance,
      }))
    }).catch(err => dispatch(setMapDirectionError(err)))
  }
}

export function setDisplayInfoTransit(res:any):Action {
  return {
    type: SET_DISPLAY_INFO_TRANSIT,
    payload: res,
  }
}

export function getNowPosition():Promise {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      resolve({ lat: latitude, lng: longitude })
    },
    error => reject(error),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    )
  })
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

export function setMapDirectionError(res : any):Action {
  return {
    type: SET_MAP_DIRECTION_ERROR,
    payload: res,
  }
}

export function setAudioDuration(res : number):Action {
  return {
    type: SET_AUDIO_DURATION,
    payload: res,
  }
}

export function setAudioPosition(res : number):Action {
  return {
    type: SET_AUDIO_POSITION,
    payload: res,
  }
}

export function switchDisplayInfoCard(which : number):Action {
  return {
    type: SWITCH_DISPLAY_INFO_CARD,
    payload: which,
  }
}
