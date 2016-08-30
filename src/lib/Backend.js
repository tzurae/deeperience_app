/**
 * Backend Interface
 */
'use strict'
require('regenerator/runtime')

export default class Backend {
  /**
   * ###  getProvder
   * @param provider: string, "facebook" or "google"
   * @return the instance of firebase.auth.FacebookAuthProvider or firebase.auth.GoogleAuthProvider
   * which property only one: providerId:string
   * https://firebase.google.com/docs/reference/js/firebase.auth.FacebookAuthProvider
   * https://firebase.google.com/docs/reference/js/firebase.auth#googleauthprovider
   * https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider
   */
  getProvider(provider){

  }
  /**
   * ### loginWithProvider
   *
   * @param provider: string, "facebook" or "google"
   *
   * @return user.json
   * Property and Method -> https://firebase.google.com/docs/reference/node/firebase.User
   */
  async loginWithProvider(provider) {

  }
  /**
   * ### signup
   *
   * @param user
   * {username: "barton", password: "Passw0rd!"}
   * @return
   *@returns user.json
   * Properties -> https://firebase.google.com/docs/reference/node/firebase.User
   */
  async signup(user) {

  }
 /**
   * ### login
   * @param user
   *  {username: "barton", password: "Passw0rd!"}
   * @returns user.json
   * Properties -> https://firebase.google.com/docs/reference/node/firebase.User
   */
  async login(user) {

  }
  /**
   * ### logout
   * returns firebase.Promise containing void
   */
  async logout() {

  }
  /**
   * ### resetPassword
   * @param newPassword:string
   * @returns object
   * if error:  {code: xxx, error: 'message'}
   */
  async resetPassword(data) {

  }
  /**
   * ### updateProfile
   * @param updateData:object
   * property:https://firebase.google.com/docs/reference/node/firebase.User
   * @return user.json
   */
  async updateProfile(updateData) {
  }

};

