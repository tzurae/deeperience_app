'use strict'

export default class apiInterface {

  /**
   * ### initAuth : call by starting app
   * @param : none
   * @return : object
   */
  initAuth() {}

  /**
   * ###  getProvder
   * @param provider: string, "facebook" or "google"
   * @return the instance of firebase.auth.FacebookAuthProvider or firebase.auth.GoogleAuthProvider
   * which property only one: providerId:string
   * https://firebase.google.com/docs/reference/js/firebase.auth.FacebookAuthProvider
   * https://firebase.google.com/docs/reference/js/firebase.auth#googleauthprovider
   * https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider
   */
  getProvider(provider) {}

  /**
   * ### loginWithProvider
   *
   * @param provider: string, "facebook" or "google"
   *
   * @return user.json
   * Property and Method -> https://firebase.google.com/docs/reference/node/firebase.User
   */
  loginWithProvider(provider) {}

  /**
   * ### signup
   *
   * @param user
   * {username: "barton", password: "Passw0rd!"}
   * @returns user.json
   * Properties -> https://firebase.google.com/docs/reference/node/firebase.User
   */
  signup(user) {}

  /**
   * ### login
   * @param user
   *  {username: "barton", password: "Passw0rd!"}
   * @returns user.json
   * Properties -> https://firebase.google.com/docs/reference/node/firebase.User
   */
  login(user) {}

  /**
   * ### logout
   * returns firebase.Promise containing void
   */
  logout() {}

  /**
   * ### resetPassword
   * @param newPassword:string
   * @returns object
   * if error:  {code: xxx, error: 'message'}
   */
  resetPassword(data) {}

  /**
   * ### updateProfile
   * @param updateData:object
   * property:https://firebase.google.com/docs/reference/node/firebase.User
   * @return user.json
   */
  updateProfile(updateData) {}

  /**
   * ### writeDataBase
   * @parms path: string , value: object
   * @return promise
   */
  writeDataBase(path, value) {}

  /**
   * ### writeDataBase
   * @parms path: string , value: object
   * @return promise
   */
  updateDataBase(path, value) {}
}
