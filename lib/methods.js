'use strict'

const users = require('../models/index').users
const orders = require('../models/index').orders

async function setInvalidateUser(userId) {

    let result

    try {
        result = await users.setInvalidateUser(userId)
    } catch (error) {
        console.log(error)
        return false
    }

    return result
}

async function setActiveUser(userId) {
    let result

    try {
        result = await users.setActiveUser(userId)
    } catch (error) {
        console.log(error)
        return false
    }

    return result
}

async function deliveredOrder(orderId) {
    let result
    try {
        result = await orders.deliveredOrder(orderId)
    } catch (error) {
        console.log(error)
        return false
    }

    return result
}

module.exports = {
    deliveredOrder: deliveredOrder,
    setActiveUser: setActiveUser,
    setInvalidateUser: setInvalidateUser
}