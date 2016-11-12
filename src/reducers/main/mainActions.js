// @flow weak
/**
 * # mainActions.js
 *
 * Actions that are use to control App flow
 */
'use strict'

const {
  LOAD_APP,
  SET_FIRST_TIME,
} = require('../../constants/actions').default

export function loadApp() {
  return {
    type: LOAD_APP,
  }
}

export function setFirstTime() {
  return {
    type: SET_FIRST_TIME,
  }
}

