import { fork, take, put } from 'redux-saga/effects'
import * as tripActions from './tripActions'
import I18n from '../../lib/i18n'
import { auth } from '../../config'
import { calculateTripInfo, convertPolyline, setSiteStatusStorage } from './tripHelper'
import storageEngine from '../../lib/localStorage'
import UniFetch from '../../lib/uniFetch'

const {
  GET_BUY_TRIP,
  SET_TRIP_CONTENT,
  GET_DISPLAY_INFO_DIRECTION_START,
  SET_MAP_DIRECTION,
} = require('../../lib/constants').default

export function* getBuyTrip() {
  try {
    const tripData = yield UniFetch({
      method: 'GET',
      path: '/api/trips/buy',
    })
    yield put(tripActions.getBuyTripSuccess(tripData.buyTrip))
  } catch (err) {
    yield put(tripActions.getBuyTripFailure(err))
  }
}

export function* setTripContent(tripContent) {
  try {
    const { routes, startSite, sites } = tripContent
    console.log(sites)
    const allSites = {}
    sites.forEach(site => {
      allSites[site._id] = site
    })
    const tripInfo = calculateTripInfo(routes, startSite, allSites)
    yield put(tripActions.setTripContentSuccess({
      tripContent,
      tripInfo,
    }))
    const tripId = tripContent._id
    const loadData = yield storageEngine(tripId).load()
    if (!loadData.siteStatus) {
      yield setSiteStatusStorage(tripId, tripInfo.siteStatus)
    } else {
      yield put(tripActions.setSiteStatus(loadData.siteStatus))
      yield setSiteStatusStorage(tripId, loadData.siteStatus)
    }
  } catch (err) {
    yield put(tripActions.setTripContentFailure(err))
  }
}

export function* getDisplayInfoDirection(payload) {
  const { mode, position } = payload
  let modeStr = 'transit'
  let startCallback = tripActions.setDisplayInfoTransit
  let successCallback = tripActions.setDisplayInfoTransitSuccess
  let errorCallback = tripActions.setDisplayInfoTransitFailure
  switch (mode) {
    case 0:
      modeStr = 'transit'
      startCallback = tripActions.setDisplayInfoTransit
      successCallback = tripActions.setDisplayInfoTransitSuccess
      errorCallback = tripActions.setDisplayInfoTransitFailure
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
  try {
    yield put(startCallback())

    const directions = yield getNowPosition().then(({ lat, lng }) => {
      return fetch('https://maps.googleapis.com/maps/api/directions/json?' +
        `origin=${lat},${lng}` +
        `&destination=${position.lat},${position.lng}` +
        '&region=tw' +
        `&mode=${modeStr}` +
        '&language=zh-TW' +
        `&key=${auth.firebase.apiKey}`)
    }).then(res => res.json())

    if (mode === 0) {
      let departureTime = ''
      let arrivalTime = ''
      let durationText = ''
      let stepsArr = []
      let fare = ''

      if (directions.routes.length !== 0) { // has route
        const { departure_time, arrival_time, duration, steps } = directions.routes[0].legs[0]
        if (departure_time) departureTime = departure_time.text
        if (arrival_time) arrivalTime = arrival_time.text
        if (duration) durationText = duration.text
        stepsArr = steps
        if (directions.routes[0].fare) fare = directions.routes[0].fare.text
        else fare = I18n.t('TripContent.noFareData')
      }

      yield put(successCallback({
        departureTime,
        arrivalTime,
        duration: durationText,
        steps: stepsArr,
        fare,
      }))
    }
  } catch (err) {
    yield put(errorCallback(err))
  }
}

export function* setMapDirection(payload) {
  console.log(payload)
  const destLat = payload.position.lat
  const destLng = payload.position.lng
  const { name, introduction } = payload
  try {
    const directions = yield getNowPosition().then(({ lat, lng }) => {
      return fetch('https://maps.googleapis.com/maps/api/directions/json?' +
        `origin=${lat},${lng}` +
        `&destination=${destLat},${destLng}` +
        '&region=tw' +
        '&mode=walking' +
        '&language=zh-TW' +
        `&key=${auth.firebase.apiKey}`)
    }).then(res => res.json())
    if (directions.routes.length === 0) { // no route
      yield put(tripActions.setMapDirection({
        polyline: [],
        name,
        introduction,
        distance: I18n.t('TripAction.noRoute'),
      }))
    } else {
      const distance = directions.routes[0].legs[0].distance.text
      const polyline = convertPolyline(directions.routes[0].overview_polyline.points)
      yield put(tripActions.setMapDirectionSuccess({
        polyline,
        name,
        introduction,
        distance,
      }))
    }
  } catch (err) {
    yield put(tripActions.setMapDirectionFailure(err))
  }
}

/**
 * Watchers
 */

export function* watchGetBuyTrip() {
  while (true) {
    yield take(GET_BUY_TRIP)
    yield fork(getBuyTrip)
  }
}

export function* watchSetTripContent() {
  while (true) {
    const { payload } = yield take(SET_TRIP_CONTENT)
    yield fork(setTripContent, payload)
  }
}

export function* watchGetDisplayInfoDirection() {
  while (true) {
    const { payload } = yield take(GET_DISPLAY_INFO_DIRECTION_START)
    yield fork(getDisplayInfoDirection, payload)
  }
}

export function* watchSetMapDirection() {
  while (true) {
    const { payload } = yield take(SET_MAP_DIRECTION)
    yield fork(setMapDirection, payload)
  }
}

export default [
  fork(watchGetBuyTrip),
  fork(watchSetTripContent),
  fork(watchGetDisplayInfoDirection),
  fork(watchSetMapDirection),
]

function getNowPosition() {
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
