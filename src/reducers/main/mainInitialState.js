/**
 * # mainInitialState.js
 *
 * control states different from auth trip global and device
 *
 */
'use strict'
const { Record } = require('immutable')

const InitialState = Record({
  residentFee: [2500, 5000],
  tripFee: [2500, 5000],
  allFee: [0, 0],
  day: 0,
  hotelType: 0, // 0 means null
  tripLocation: 0,
})
export default InitialState

