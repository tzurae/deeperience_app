/**
 * # mainInitialState.js
 *
 * control states different from auth trip global and device
 *
 */
'use strict'
const { Record } = require('immutable')

const InitialState = Record({
  residentFee: [2500, 7500],
  allFee: [2500, 7500],
})
export default InitialState

