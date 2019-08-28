'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://herbalife-4e009.firebaseio.com/'
})

const db = firebase.database()

const Users = require('./user')
const Products = require('./product')
const Orders = require('./orders')

module.exports = {
    products: new Products(db),
    users: new Users(db),
    orders: new Orders(db)
}

