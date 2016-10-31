/**
 * # customReducer.js
 *
 * The reducer for set custom pages
 */
'use strict'
import InitialState from './customInitialState'

const {
  RESIDENT_FEE,
  TRIP_FEE,
  FOOD_FEE,

  SET_STATE,

  SET_FEE,
  SET_DAY,
  SET_TRIP_LOCATION,
  SET_TRIP_ELEMENT,
  TOGGLE_TRIP_ELEMENT,
  TOGGLE_HOTEL_TYPE,
  TOGGLE_FOOD_ELEMENT,
  SET_OTHER_DEMAND,
  RESET_CUSTOM,
  TOGGLE_BOOK_HOTEL,
} = require('../../lib/constants').default

const initialState = new InitialState()

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  const tripFee = state.getIn(['tripFee'])
  const residentFee = state.getIn(['residentFee'])
  const day = state.getIn(['day'])
  const tripElement = state.getIn(['tripElement'])
  const hotelType = state.getIn(['hotelType'])
  const foodElement = state.getIn(['foodElement'])
  switch (action.type) {
    case SET_FEE:
      if (action.payload.type === RESIDENT_FEE) {
        return state.setIn(['residentFee'], action.payload.fee)
                    .setIn(['allFee'], [(action.payload.fee[0] + tripFee[0]) * day,
                                        (action.payload.fee[1] + tripFee[1]) * day])
      } else if (action.payload.type === TRIP_FEE) {
        return state.setIn(['tripFee'], action.payload.fee)
                    .setIn(['allFee'], [(action.payload.fee[0] + residentFee[0]) * day,
                                        (action.payload.fee[1] + residentFee[1]) * day])
      } else if (action.payload.type === FOOD_FEE) {
        return state.setIn(['foodFee'], action.payload.fee)
      }
      return state

    case SET_DAY:
      return state.setIn(['day'], action.payload.day)
                  .setIn(['allFee'], [(tripFee[0] + residentFee[0]) * action.payload.day,
                                      (tripFee[1] + residentFee[1]) * action.payload.day])

    case SET_TRIP_LOCATION:
      return state.setIn(['tripLocation'], action.payload.tripLocation)

    case SET_TRIP_ELEMENT:
      return state.setIn(['tripElement'], action.payload.tripElement)

    case TOGGLE_TRIP_ELEMENT:
      return state.setIn(['tripElement'],
                          tripElement.map(
                            (element, index) =>
                              index === action.payload ?
                              !element : element))
    case TOGGLE_HOTEL_TYPE:
      return state.setIn(['hotelType'],
        hotelType.map(
          (element, index) =>
            index === action.payload ?
              !element : element))
    case TOGGLE_FOOD_ELEMENT:
      return state.setIn(['foodElement'],
        foodElement.map(
          (element, index) =>
            index === action.payload ?
              !element : element))

    case SET_OTHER_DEMAND:
      return state.setIn(['otherDemand'], action.payload.otherDemand)

    case RESET_CUSTOM:
      return initialState

    case TOGGLE_BOOK_HOTEL:
      return state.setIn(['bookHotel'], !state.getIn(['bookHotel']))

    case SET_STATE:
      return state
  }
  return state
}
