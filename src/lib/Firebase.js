"use strict";

require('regenerator/runtime')

import firebase from 'firebase'
import CONFIG from './config'
import BackendInterface from './Backend'

const firebaseApp = firebase.initializeApp(CONFIG.FIREBASE)
const firebaseAuth = firebaseApp.auth()

export default class Firebase extends BackendInterface {
  getProvider(provider) {
    switch (provider) {
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider()
        break;
      case 'google':
        return new firebase.auth.GoogleAuthProvider()
        break;
    }
  }
  async loginWithProvider(provider) {
    let providerId = this.getProvider(provider)
    return await firebaseAuth.signInWithPopup(providerId)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw res.json
        }
      })
      .catch((error) => {
        throw error
      })
  }
  async signup(user) {
    return await firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((user) => {
        return user.json
      })
      .catch(error => {
        throw error
      })
  }
  async login(user) {
    return await firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((user) =>{
        return user.json
      })
      .catch((error) => {
        throw error
      })
  }
  async logout() {
    return await firebaseAuth.signOut()
      .then(()=>{
        return {
          success: true,
          message: 'logout'
        }
      })
  }
  async updateProfile(updateData) {
    if (firebaseAuth.currentUser) {
      let user = firebaseAuth.currentUser
      return await user.updateProfile({
        displayName: u.displayName,
        photoUrl: '',
        //...etc
      })
        .then(user => {
          return user.json
        })
        .catch(error => {
          throw error
        })
    }
  }
  async resetPassword(newPassword) {
    return await firebaseAuth.currentUser.updatePassword(newPassword)
      .then(() => {
        return {
          success: true,
          message: 'resetPassword'
        }
      })
      .catch(error =>{
        throw error
      })
  }
}
