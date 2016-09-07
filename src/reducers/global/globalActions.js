/**
 * # globalActions.js
 *
 * Actions that are global in nature
 */
'use strict'
import type { Action } from '../../lib/types'

const {
  SET_STORE,
  SET_STATE,
  GET_STATE,
} = require('../../lib/constants').default

/**
 * ## set the store
 *
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore(store:any):Action {
  return {
    type: SET_STORE,
    payload: store,
  }
}
/**
 * ## set state
 *
 */
export function setState(newState:any):Action {
  return {
    type: SET_STATE,
    payload: newState,
  }
}
/**
 * ## getState
 *
 */
export function getState(toggle:any):Action {
  return {
    type: GET_STATE,
    payload: toggle,
  }
}
