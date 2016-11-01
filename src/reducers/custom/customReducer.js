/**
 * # customReducer.js
 *
 * The reducer for set custom pages
 */
'use strict'
import InitialState from './customInitialState'

const {

  LOGOUT_SUCCESS,

  RESIDENT_FEE,
  TRIP_FEE,
  FOOD_FEE,

  SET_STATE,

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

  SEND_POST_REQUEST,
  SEND_POST_SUCCESS,
  SEND_POST_FAILURE,

  TOGGLE_NOT_SEND_YET,
} = require('../../lib/constants').default

const initialState = new InitialState()

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  const tripFee = state.get('tripFee')
  let day = state.get('day')
  const residentFee = state.get('residentFee')
  const tripElement = state.get('tripElement')
  const hotelType = state.get('hotelType')
  const foodElement = state.get('foodElement')
  switch (action.type) {
    case SET_PEOPLE:
      return state.setIn(['people'], action.payload)

    case SET_FEE:
      if (action.payload.type === RESIDENT_FEE) {
        return state.set('residentFee', action.payload.fee)
                    .set('allFee', [(action.payload.fee[0] + tripFee[0]) * day,
                                        (action.payload.fee[1] + tripFee[1]) * day])
      } else if (action.payload.type === TRIP_FEE) {
        return state.set('tripFee', action.payload.fee)
                    .set('allFee', [(action.payload.fee[0] + residentFee[0]) * day,
                                        (action.payload.fee[1] + residentFee[1]) * day])
      } else if (action.payload.type === FOOD_FEE) {
        return state.set('foodFee', action.payload.fee[0])
      }
      return state

    case SET_TRIP_DATE:
      day = (action.payload.endDate - action.payload.startDate) / (24 * 3600 * 1000)
      return state.set('startDate', action.payload.startDate)
                  .set('endDate', action.payload.endDate)
                  .set('day', day)
                  .set('allFee', [(tripFee[0] + residentFee[0]) * day,
                                      (tripFee[1] + residentFee[1]) * day])

    case SET_TRIP_LOCATION:
      return state.set('tripLocation', action.payload.tripLocation)

    case SET_TRIP_ELEMENT:
      return state.set('tripElement', action.payload.tripElement)

    case TOGGLE_TRIP_ELEMENT:
      return state.set('tripElement',
                          tripElement.map(
                            (element, index) =>
                              index === action.payload ?
                              !element : element))
    case TOGGLE_HOTEL_TYPE:
      return state.set('hotelType',
        hotelType.map(
          (element, index) =>
            index === action.payload ?
              !element : element))
    case TOGGLE_FOOD_ELEMENT:
      return state.set('foodElement',
        foodElement.map(
          (element, index) =>
            index === action.payload ?
              !element : element))

    case SET_OTHER_DEMAND:
      return state.set('otherDemand', action.payload.otherDemand)

    case RESET_CUSTOM:
      return initialState

    case TOGGLE_BOOK_HOTEL:
      return state.set('bookHotel', !state.get('bookHotel'))

    case TOGGLE_BOOK_RESTAURANT:
      return state.set('bookRestaurant', !state.get('bookRestaurant'))

    case SEND_POST_REQUEST:
      return state.set('isFetching', true)
    case SEND_POST_SUCCESS:
      return state.set('isFetching', false)
    case SEND_POST_FAILURE:
      return state.set('isFetching', false)
                  .set('error', action.payload)

    case TOGGLE_NOT_SEND_YET:
      return state.set('notSendYet', !state.get('notSendYet'))

    case LOGOUT_SUCCESS:
    case SET_STATE:
      return state
  }
  return state
}
