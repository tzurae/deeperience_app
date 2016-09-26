// @flow
'use strict'
import ApiFactory from '../../api/apiFactory'
import type { ThunkAction, Action } from '../../lib/types'
import { promiseFor } from '../../lib/util'
import { calculateTripInfo, convertPolyline } from './tripHelper'
import { auth } from '../../config'
import I18n from '../../lib/i18n'

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
  SET_MAP_INFO_SUCCESS,
  SET_MAP_INFO_FAILURE,
  SET_MAP_DIRECTION,
  SET_MAP_DIRECTION_ERROR,

  SET_AUDIO,
  RESET_AUDIO,

  SET_DISPLAY_INFO_TRANSIT,
  SET_DISPLAY_INFO_TRANSIT_SUCCESS,
  SET_DISPLAY_INFO_TRANSIT_FAILURE,

  SWITCH_DISPLAY_INFO_CARD,
  PRESS_MARKER_FAILURE,
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

export function getDisplayInfoDirection(mode: number, position: any):ThunkAction {
  return dispatch => {
    dispatch(setDisplayInfoTransit())
    let modeStr = 'transit'
    let startCallback = setDisplayInfoTransit
    let successCallback = setDisplayInfoTransitSuccess
    let errorCallback = setDisplayInfoTransitFailure
    switch (mode) {
      case 0:
        modeStr = 'transit'
        startCallback = setDisplayInfoTransit
        successCallback = setDisplayInfoTransitSuccess
        errorCallback = setDisplayInfoTransitFailure
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
    dispatch(startCallback())

    return getNowPosition().then(({ lat, lng }) => {
      return fetch('https://maps.googleapis.com/maps/api/directions/json?' +
        `origin=${lat},${lng}` +
        `&destination=${position.lat},${position.lng}` +
        '&region=tw' +
        `&mode=${modeStr}` +
        '&language=zh-TW' +
        `&key=${auth.firebase.apiKey}`)
    }).then(res => res.json()).then(res => {
      if (mode === 0) {
        let departureTime
        let arrivalTime
        let duration
        let steps
        let fare

        if (res.routes.length === 0) {
          departureTime = ''
          arrivalTime = ''
          duration = ''
          steps = []
          fare = ''
        } else {
          departureTime = res.routes[0].legs[0].departure_time.text
          arrivalTime = res.routes[0].legs[0].arrival_time.text
          duration = res.routes[0].legs[0].duration.text
          steps = res.routes[0].legs[0].steps
          if (res.routes[0].fare === undefined) fare = I18n.t('TripContent.noFareData')
          else fare = res.routes[0].fare.text
        }

        dispatch(successCallback({
          departureTime,
          arrivalTime,
          duration,
          steps,
          fare,
        }))
      }
    }).catch(err => dispatch(errorCallback(err)))
  }
}

export function getMapInfoDirection(outres :any):ThunkAction {
  return dispatch => {
    return getNowPosition().then(({ lat, lng }) => {
      return fetch('https://maps.googleapis.com/maps/api/directions/json?' +
        `origin=${lat},${lng}` +
        `&destination=${outres.address}` +
        '&region=tw' +
        '&mode=walking' +
        '&language=zh-TW' +
        `&key=${auth.firebase.apiKey}`)
    }).then(res => res.json()).then(res => {
      const { name, introduction, address } = outres
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

export function getNowPosition():Promise<Action> {
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

export function setMapInfoWrapper(res: any):ThunkAction {
  return dispatch => dispatch(setMapInfo(res))
}

export function setMapInfoSuccess(res : any):Action {
  return {
    type: SET_MAP_INFO_SUCCESS,
    payload: res,
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

export function setMapDirectionError(res : any):Action {
  return {
    type: SET_MAP_DIRECTION_ERROR,
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

export function switchDisplayInfoCard(which : number):Action {
  return {
    type: SWITCH_DISPLAY_INFO_CARD,
    payload: which,
  }
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
