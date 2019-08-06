'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://herbalife-4e009.firebaseio.com/'
})

const db = firebase.database()

const Users = require('./user')

module.exports = {
    users: new Users(db)
}

