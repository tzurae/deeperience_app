/**
 * # deviceActions.js
 *
 * What platform are we running on, ie ```ios``` or ```android```
 *
 * What version is the app?
 *
 */
'use strict'
import type { Action } from '../../lib/types'

const {
  SET_PLATFORM,
  SET_VERSION,
} = require('../../lib/constants').default

/**
 * ## Set the platformState
 *
 */
export function setPlatform(platform:string):Action {
  return {
    type: SET_PLATFORM,
    payload: platform,
  }
}
/**
 * ## set the version
 *
 */
export function setVersion(version:string):Action {
  return {
    type: SET_VERSION,
    payload: version,
  }
}
