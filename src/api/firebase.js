'use strict'

import firebase from 'firebase'
import CONFIG from './config'
import apiInterface from './apiInterface'
import R from 'reactotron-react-native'

const firebaseApp = firebase.initializeApp(CONFIG.FIREBASE)
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
  signup({ email, password }) {
    let firelog = firebaseAuth.createUserWithEmailAndPassword(email, password)
    R.log(firelog)
    return firelog
    // return firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
  }
  login({ email, password }) {
    return firebaseAuth.signInWithEmailAndPassword(email, password)
  }
  logout() {
    return firebaseAuth.signOut()
  }
  updateProfile(updateData) {
    if (firebaseAuth.currentUser) {
      const user = firebaseAuth.currentUser
      return user.updateProfile({
        displayName: user.displayName, // ????
        photoUrl: '',
        //...etc
      })
    }
  }
  resetPassword(newPassword) {
    return firebaseAuth.currentUser.updatePassword(newPassword)
  }
  writeDataBase(path, value) {
    return firebase.database().ref(path).set(value)
  }
  updateDataBase(path, value) {
    return firebase.database().ref(path).update(value)
  }
}
