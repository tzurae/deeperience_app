// @flow weak
'use strict'

const {
  SET_FEE,
  SET_DAY,
  SET_HOTEL_TYPE,
  SET_TRIP_LOCATION,
} = require('../../lib/constants').default

export function setFee(type: string, fee: [number, number]) {
  return {
    type: SET_FEE,
    payload: {
      type,
      fee,
    },
  }
}

export function setDay(day: number) {
  return {
    type: SET_DAY,
    payload: {
      day,
    },
  }
}

export function setHotelType(type: number) {
  return {
    type: SET_HOTEL_TYPE,
    payload: {
      type,
    },
  }
}

export function setTripLocation(tripLocation: number) {
  return {
    type: SET_TRIP_LOCATION,
    payload: {
      tripLocation,
    },
  }
}
