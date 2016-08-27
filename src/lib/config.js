'use strict'

module.exports = {
    FIREBASE: {
        apiKey: "AIzaSyCbJ4b2NfjBg0ayvzakpU2qtR2LvL51ed8",
        authDomain: "groceryapp-ca227.firebaseapp.com",
        databaseURL: "https://groceryapp-ca227.firebaseio.com",
        storageBucket: "groceryapp-ca227.appspot.com",
    },
    backend: {
        firebase: false,
        hapiRemote: false,
        hapiLocal: true
    },
    HAPI: {
        local: {
            url: 'http://127.0.0.1:5000'
        },
        remote: {
            url: 'enter your remote url here'
        }
    }
}