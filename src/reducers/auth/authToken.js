/**
 * # AppAuthToken.js
 *
 * A thin wrapper over the react-native-simple-store
 *
 * Singleton module see https://k94n.com/es6-modules-single-instance-pattern
 * Code from https://github.com/bartonhammond/snowflake/blob/master/src/lib/AppAuthToken.js
 */
'use strict'
import localStorage from '../../lib/localStorage'
import { auth as Config } from '../../config'

export class AppAuthToken {
  constructor() {
    this.SESSION_TOKEN_KEY = Config.sessionTokenKey
  }

  storeSessionToken(sessionToken) {
    return localStorage(this.SESSION_TOKEN_KEY).save(sessionToken)
  }
  /**
   * ### getSessionToken
   * @param {Object} sessionToken the currentUser object
   *
   * When Hot Loading, the sessionToken  will be passed in, and if so,
   * it needs to be stored on the device.  Remember, the store is a
   * promise so, have to be careful.
   */
  getSessionToken(sessionToken) {
    if (sessionToken) {
      localStorage(this.SESSION_TOKEN_KEY)
        .save(sessionToken)
        .then(() => localStorage(this.SESSION_TOKEN_KEY).load())
    }
    return localStorage(this.SESSION_TOKEN_KEY).save(sessionToken)
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    return localStorage(this.SESSION_TOKEN_KEY).delete()
  }
}
// The singleton variable
export const appAuthToken = new AppAuthToken()
