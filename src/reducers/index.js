/**
 * # reducers
 * This class combines all the reducers into one
 */
'use strict'
import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'
import main from './main/mainReducer'
import custom from './custom/customReducer'
import trip from './trip/tripReducer'

import { combineReducers } from 'redux'

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  auth,
  device,
  global,
  main,
  trip,
  custom,
})

export default rootReducer
