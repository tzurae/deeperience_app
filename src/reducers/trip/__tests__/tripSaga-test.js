import { put, call, take, fork } from 'redux-saga/effects'
import { expect } from 'chai'
import * as tripActions from '../tripActions'
import { routes, startSite, allSites, tripInfo, tripContent } from  './fakeTripData'
import { calculateTripInfo, convertPolyline, setSiteStatusStorage } from '../tripHelper'
import { getMainStorage } from '../../main/mainStorage'
import storageEngine from '../../../lib/localStorage'

import {
  watchGetBuyTrip,
  watchSetTripContent,
  watchGetDisplayInfoDirection,
  watchSetMapDirection,
  getBuyTrip,
  setTripContent,
  getDisplayInfoDirection,
  setMapDirection,
} from '../tripSaga'
import UniFetch from '../../../lib/uniFetch'

const {
  GET_BUY_TRIP,
  SET_TRIP_CONTENT,
  GET_DISPLAY_INFO_DIRECTION_START,
  SET_MAP_DIRECTION,
} = require('../../../lib/constants').default

describe('getBuyTrip', () => {
  it('watchGetBuyTrip() should take the GET_BUY_TRIP action', () => {
    const gen = watchGetBuyTrip()
    const next = gen.next().value
    expect(next).to.deep.equal(take(GET_BUY_TRIP))
  })

  it('should get buy trip successful', () => {
    const tripData = {
      buyTrip: [{}],
    }

    const gen = getBuyTrip()
    let next = gen.next().value
    expect(next).to.deep.equal(UniFetch({
      method: 'GET',
      path: '/api/trips/buy',
    }))

    next = gen.next(tripData).value
    expect(next).to.deep.equal(put(tripActions.getBuyTripSuccess(tripData.buyTrip)))
  })
})

describe('setTripContent', () => {
  it('watchSetTripContent() should take the SET_TRIP_CONTENT action', () => {
    const gen = watchSetTripContent()
    const next = gen.next().value
    expect(next).to.deep.equal(take(SET_TRIP_CONTENT))
  })

  it('should set trip content successful with siteStatus', () => {
    const loadData = {}
    const gen = setTripContent(tripContent)

    let next = gen.next().value
    expect(next).to.deep.equal(put(tripActions.setTripContentSuccess({
      tripContent,
      tripInfo,
    })))

    const tripId = tripContent._id

    next = gen.next().value
    expect(next).to.deep.equal(storageEngine(tripId).load())

    next = gen.next(loadData).value
    expect(next).to.deep.equal(setSiteStatusStorage(tripId, tripInfo.siteStatus))
  })

  it('should set trip content successful with siteStatus', () => {
    const loadData = {
      siteStatus: [3, 0, 0, 0, 0, 0, 0],
    }
    const tripInfo1 = calculateTripInfo(routes, startSite, allSites)

    const gen = setTripContent(tripContent)
    expect(tripInfo).to.deep.equal(tripInfo1)

    let next = gen.next().value
    expect(next).to.deep.equal(put(tripActions.setTripContentSuccess({
      tripContent,
      tripInfo,
    })))

    const tripId = tripContent._id

    next = gen.next().value
    expect(next).to.deep.equal(storageEngine(tripId).load())

    next = gen.next(loadData).value
    expect(next).to.deep.equal(put(tripActions.setSiteStatus(loadData.siteStatus)))

    next = gen.next().value
    expect(next).to.deep.equal(setSiteStatusStorage(tripId, tripInfo.siteStatus))
  })

  it('should set calculate tripinfo', () => {
    const tripInfo1 = calculateTripInfo(routes, startSite, allSites)

    expect(tripInfo).to.deep.equal(tripInfo1)
  })
})

describe('setMapDirection', () => {
  it('watchSetMapDirection() should take the SET_MAP_DIRECTION action', () => {
    const gen = watchSetMapDirection()
    const next = gen.next().value
    expect(next).to.deep.equal(take(SET_MAP_DIRECTION))
  })
})
