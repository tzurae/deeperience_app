/**
 * # customInitialState.js
 *
 * control custom state
 *
 */
'use strict'
import { tripElement, hotelType, foodElement } from '../../containers/Custom/options'
import { Record } from 'immutable'

const InitialState = Record({
  people: 1,
  residentFee: [2000, 5000],
  tripFee: [2000, 5000],
  allFee: [0, 0],
  foodFee: 400,
  hotelType: Array(hotelType.length).fill(false), // -1 means null, 0 means no idea
  tripLocation: -1,
  tripElement: Array(tripElement.length).fill(false),
  foodElement: Array(foodElement.length).fill(false),
  otherDemand: '',
  bookHotel: true,
  bookRestaurant: true,
  startDate: null,
  endDate: null,

  day: 0,
  isFetching: false,
  error: null,
})
export default InitialState

