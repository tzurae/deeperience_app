/**
 * # deviceInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'
import Dimensions from 'Dimensions'
const { height, width } = Dimensions.get('window')
const { Record } = require('immutable')

const InitialState = Record({
  isMobile: true,
  platform: '',
  version: null,
  width,
  height,
})

export default InitialState
