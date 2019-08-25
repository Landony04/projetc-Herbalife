'use strict'

const users = require('../models/index').users

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

module.exports = {
    setInvalidateUser: setInvalidateUser
}