'use strict'

import firebase from 'firebase'
import { auth as Config } from '../config'
import apiInterface from './apiInterface'

const firebaseApp = firebase.initializeApp(Config.firebase)
const firebaseAuth = firebaseApp.auth()

export default class Firebase extends apiInterface {
  initAuth() {
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          unsub()
          resolve(user)
        },
        error => reject(error)
      )
    })
  }
  getProvider(provider) {
    switch (provider) {
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider()
      case 'google':
        return new firebase.auth.GoogleAuthProvider()
    }
  }
  loginWithProvider(provider) {
    const providerId = this.getProvider(provider)
    return firebaseAuth.signInWithPopup(providerId)
  }
  signup(user) {
    return firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
  }
  login(user) {
    return firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
  }
  logout() {
    return firebaseAuth.signOut()
  }
  updateProfile(updateData) {
    if (firebaseAuth.currentUser) {
      const user = firebaseAuth.currentUser
      return user.updateProfile({
        displayName: user.displayName,
        photoUrl: '',
        //...etc
      })
    }
  }
  resetPassword(newPassword) {
    return firebaseAuth.currentUser.updatePassword(newPassword)
  }
  writeDataBase(reff, value) {
    return firebase.database().ref(reff).set(value)
  }
}
