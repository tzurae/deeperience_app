/**
 * # Parse.js
 *
 * This class interfaces with Parse.com using the rest api
 * see [https://parse.com/docs/rest/guide](https://parse.com/docs/rest/guide)
 *
 */
'use strict'

import CONFIG from './config'
import Hapi from './Hapi'
import Firebase from './Firebase'

export default function BackendFactory(token = null) {
  if (CONFIG.backend.firebase) {
    return new Firebase(token)
  } else if (CONFIG.backend.hapiLocal || CONFIG.backend.hapiRemote) {
    return new Hapi(token)
  }
}
