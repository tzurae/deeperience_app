// @flow weak
'use strict'

const {
  SET_PEOPLE,
  SET_FEE,
  SET_TRIP_DATE,
  SET_TRIP_LOCATION,
  SET_TRIP_ELEMENT,
  TOGGLE_TRIP_ELEMENT,
  TOGGLE_HOTEL_TYPE,
  TOGGLE_FOOD_ELEMENT,
  SET_OTHER_DEMAND,
  RESET_CUSTOM,
  TOGGLE_BOOK_HOTEL,
  TOGGLE_BOOK_RESTAURANT,
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

export function setTripLocation(tripLocation: number) {
  return {
    type: SET_TRIP_LOCATION,
    payload: {
      tripLocation,
    },
  }
}

export function setTripElement(tripElement: any) {
  return {
    type: SET_TRIP_ELEMENT,
    payload: {
      tripElement,
    },
  }
}

export function toggleTripElement(index: number) {
  return {
    type: TOGGLE_TRIP_ELEMENT,
    payload: index,
  }
}

export function setOtherDemand(otherDemand: string) {
  return {
    type: SET_OTHER_DEMAND,
    payload: {
      otherDemand,
    },
  }
}

export function resetCustom() {
  return {
    type: RESET_CUSTOM,
  }
}

export function toggleHotelType(index: number) {
  return {
    type: TOGGLE_HOTEL_TYPE,
    payload: index,
  }
}

export function toggleFoodElement(index: number) {
  return {
    type: TOGGLE_FOOD_ELEMENT,
    payload: index,
  }
}

export function toggleBookHotel() {
  return {
    type: TOGGLE_BOOK_HOTEL,
  }
}

export function toggleBookRestaurant() {
  return {
    type: TOGGLE_BOOK_RESTAURANT,
  }
}

export function setPeople(people: number) {
  return {
    type: SET_PEOPLE,
    payload: people,
  }
}

export function setTripDate(startDate: Date, endDate: Date) {
  return {
    type: SET_TRIP_DATE,
    payload: {
      startDate, endDate,
    },
  }
}

