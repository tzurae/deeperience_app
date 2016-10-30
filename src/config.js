
export const cloudServiceSetting = {
  firebase: false,
  mongodb: true,
}

export const auth = process.env.NODE_ENV === 'production' ? {
  firebase: {
    apiKey: 'AIzaSyDmPSiO3kL3MvLe7DImWkS1BfysGyRm0vg',
    authDomain: 'deeperience-f0bca.firebaseapp.com',
    databaseURL: 'https://deeperience-f0bca.firebaseio.com',
    storageBucket: 'deeperience-f0bca.appspot.com',
  },
  mongodb: {
    domain: 'http://localhost:3000',
  },
  sessionTokenKey: 'SESSION_TOKEN_KEY',
} : {
  firebase: {
    apiKey: 'AIzaSyDVgZwPGgSqUyVxRGR_XKTjrOnZ3FT-DvE',
    authDomain: 'deeperience.firebaseapp.com',
    databaseURL: 'https://deeperience.firebaseio.com',
    storageBucket: 'deeperience.appspot.com',
  },
  mongodb: {
    domain: 'http://localhost:3000',
  },
  sessionTokenKey: 'SESSION_TOKEN_KEY',
}

export const storageKey = 'Deeperience_react-native-storage'
