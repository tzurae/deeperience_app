// @flow
'use strict'
import ApiFactory from '../../api/apiFactory'
import type { ThunkAction, Action } from '../../lib/types'
import { calculateTripInfo, convertPolyline } from './tripHelper'
import { auth } from '../../config'
import I18n from '../../lib/i18n'
import _ from 'underscore'

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
  SET_MAP_DIRECTION_ERROR,

  SET_AUDIO,
  RESET_AUDIO,

  SET_DISPLAY_INFO_TRANSIT,
  SET_DISPLAY_INFO_TRANSIT_SUCCESS,
  SET_DISPLAY_INFO_TRANSIT_FAILURE,
  TOGGLE_DISPLAY_INFO,

  TOGGLE_MAP_MODE,

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

export function getAllTripWrapper():ThunkAction {
  return dispatch => {
    dispatch(getAllTrip())

    return new ApiFactory().readDataBaseOnce('/trips/')
      .then(res => res.val())
      .then(res => {
        const allTrip = []
        _.each(res, (value, key) => {
          allTrip.push({ ...value, tripKey: key })
        })
        return allTrip
      })
      .then(res => {
        const allTrip = []
        const tripGuide = res.map((trip) => {
          return new ApiFactory()
            .readDataBaseOnce(`/users/${trip.guideId}`)
            .then(res => res.val())
        })

        return Promise.all(tripGuide).then(guides => {
          res.forEach((trip, index) => {
            allTrip.push({
              ...trip,
              guideInfo: guides[index],
            })
          })
          return allTrip
        }).then(res => {
          console.log(res)
          dispatch(getAllTripSuccess(res))
        })
      })
      .catch(err => getAllTripFailure(err))
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

export function setTripKey(res:any):Action {
  return {
    type: SET_TRIP_KEY,
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

export function setSiteStatus(res:any):Action {
  return {
    type: SET_SITE_STATUS,
    payload: res,
  }
}

export function getTripContentTest(tripId:string):ThunkAction {
  return dispatch => {
    dispatch(getTripContent())

    return new ApiFactory().readDataBaseOnce(`/trips/${tripId}`)
      .then(res => {
        dispatch(getTripContentSuccess(res.val()))
        const allSitesKey = res.val().allSites
        const { routes, startSites } = res.val()
        const promiseAllSite = allSitesKey.map((key) => {
          return new ApiFactory()
                      .readDataBaseOnce(`/site/${key}`)
                      .then(res => res.val())
        })

        return Promise.all(promiseAllSite).then(sites => {
          const allSites = {}
          sites.forEach((site, index) => {
            allSites[allSitesKey[index]] = site
          })
          return allSites
        }).then(allSites => {
          dispatch(
            setSiteContentSuccess(
              calculateTripInfo(routes, startSites, allSites)
            )
          )
        })
      })
      .catch((error) => {
        dispatch(getTripContentFailure(error))
      })
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
        const promiseAllSite = allSitesKey.map((key) => {
          return new ApiFactory()
            .readDataBaseOnce(`/site/${key}`)
            .then(res => res.val())
        })

        return Promise.all(promiseAllSite).then(sites => {
          const allSites = {}
          sites.forEach((site, index) => {
            allSites[allSitesKey[index]] = site
          })
          return allSites
        }).then(allSites => {
          dispatch(
            setSiteContentSuccess(
              calculateTripInfo(routes, startSites, allSites)
            )
          )
        })
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
        let departureTime = ''
        let arrivalTime = ''
        let durationText = ''
        let stepsArr = []
        let fare = ''
        console.log(res)

        if (res.routes.length !== 0) { // has route
          const { departure_time, arrival_time, duration, steps } = res.routes[0].legs[0]
          if (departure_time) departureTime = departure_time.text
          if (arrival_time) arrivalTime = arrival_time.text
          if (duration) durationText = duration.text
          stepsArr = steps
          if (res.routes[0].fare) fare = res.routes[0].fare.text
          else fare = I18n.t('TripContent.noFareData')
        }

        dispatch(successCallback({
          departureTime,
          arrivalTime,
          duration: durationText,
          steps: stepsArr,
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
      if (res.routes.length === 0) { // no route
        dispatch(setMapDirection({
          polyline: [],
          name,
          introduction,
          address,
          distance: I18n.t('TripAction.noRoute'),
        }))
      } else {
        const distance = res.routes[0].legs[0].distance.text
        const polyline = convertPolyline(res.routes[0].overview_polyline.points)
        dispatch(setMapDirection({
          polyline,
          name,
          introduction,
          address,
          distance,
        }))
      }
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

export function pressmarkerfailurewrapper(res: any):ThunkAction {
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
