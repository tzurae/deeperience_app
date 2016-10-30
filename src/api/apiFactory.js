'use strict'

import { cloudServiceSetting as Is } from '../config'
import Firebase from './firebase'
import Mongodb from './mongodb'

export default function apiFactory(token = null) {
  if (Is.firebase) {
    return new Firebase()
  } else if (Is.mongodb) {
    return new Mongodb()
  }
}
