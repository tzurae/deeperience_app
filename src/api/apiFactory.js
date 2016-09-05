'use strict'

import CONFIG from './config'
import Firebase from './firebase'

export default function apiFactory(token = null) {
  if (CONFIG.backend.firebase) {
    return new Firebase()
  }
}
