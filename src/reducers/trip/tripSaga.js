import { call, fork, take, put } from 'redux-saga/effects'
import * as tripActions from './tripActions'
import ApiFactory from '../../api/apiFactory'
import I18n from '../../lib/i18n'
import _ from 'underscore'
import { auth } from '../../config'
import { calculateTripInfo, convertPolyline, setSiteStatusStorage } from './tripHelper'
import storageEngine from '../../lib/localStorage'

const {
  GET_ALL_TRIP,
  GET_TRIP_CONTENT,
  GET_DISPLAY_INFO_DIRECTION_START,
  SET_MAP_DIRECTION,
} = require('../../lib/constants').default

const api = new ApiFactory()

export function* getAllTrip(payload) {
  try {
    const tempAllTrip = yield api.readDataBaseOnce('/trips/')
      .then(res => {
        const allTrip = []
        _.each(res, (value, key) => {
          allTrip.push({ ...value, tripKey: key })
        })
        return allTrip
      })

    const allTrip = []
    const tripGuide = tempAllTrip.map((trip) => api.readDataBaseOnce(`/users/${trip.guideId}`))

    const guide = yield Promise.all(tripGuide).then(guides => {
      tempAllTrip.forEach((trip, index) => {
        allTrip.push({
          ...trip,
          guideInfo: guides[index],
        })
      })
      return allTrip
    })

    yield put(tripActions.getAllTripSuccess(guide))
  } catch (err) {
    yield put(tripActions.getAllTripFailure(err))
  }
}

export function* getTripContentById(payload) {
  try {
    const { tripId } = payload
    const tripContent = yield call([api, api.readDataBaseOnce], `/trips/${tripId}`)
    yield put(tripActions.getTripContentSuccess(tripContent))

    const allSitesKey = tripContent.allSites
    const { routes, startSites } = tripContent
    const promiseAllSite = allSitesKey.map((key) => api.readDataBaseOnce(`/site/${key}`))

    const allSites = yield Promise.all(promiseAllSite)
      .then(sites => {
        const allSites = {}
        sites.forEach((site, index) => {
          allSites[allSitesKey[index]] = site
        })
        return allSites
      })

    const tripInfo = calculateTripInfo(routes, startSites, allSites)
    yield put(tripActions.setSiteContentSuccess(tripInfo))

    const loadData = yield storageEngine(tripId).load()
    if (!loadData.siteStatus) {
      yield setSiteStatusStorage(tripId, tripInfo.siteStatus)
    } else {
      yield put(tripActions.setSiteStatus(loadData.siteStatus))
      yield setSiteStatusStorage(tripId, loadData.siteStatus)
    }
  } catch (err) {
    yield put(tripActions.getTripContentFailure(err))
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

export function* watchGetAllTrip() {
  while (true) {
    yield take(GET_ALL_TRIP)
    yield fork(getAllTrip)
  }
}

export function* watchGetTripContentById() {
  while (true) {
    const { payload } = yield take(GET_TRIP_CONTENT)
    yield fork(getTripContentById, payload)
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
  fork(watchGetAllTrip),
  fork(watchGetTripContentById),
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
