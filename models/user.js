'use strict'

const bcrypt = require('bcrypt')

class Users {
    constructor(db) {
        this.db = db
        this.ref = this.db.ref('/')
        this.collection = this.ref.child('users')
    }

    async create(data, user) {
        if (user != null) {
            data.owner = user
        }
        data.password = await this.constructor.encrypt(data.password)
        const newUser = this.collection.push()
        newUser.set(data)

        return newUser.key
    }

    async validateUser(data) {
        const userQuery = await this.collection.orderByChild('email').equalTo(data.email).once('value')
        const userFound = userQuery.val()

        if (userFound) {
            const userId = Object.keys(userFound)[0]
            const passwordRight = await bcrypt.compare(data.password, userFound[userId].password)
            const result = (passwordRight) ? userFound[userId] : false

            return result
        }

        return false
    }

    static async encrypt(password) {
        const saltRounds = 10
        const hashPassword = await bcrypt.hash(password, saltRounds)

        return hashPassword
    }

    async getUsers() {
        const query = await this.collection.once('value')
        const data = query.val()

        return data
    }

    async setInvalidateUser(userId) {
        const query = await this.collection.child(userId).once('value')
        const user = query.val()
        var status = user.status

        status = 'UNAVAILABLE'
        const update = await this.collection.child(userId).update({ 'status': status })
        console.log(update)
        return update
    }

    async setActiveUser(userId) {
        const query = await this.collection.child(userId).once('value')
        const user = query.val()
        var status = user.status

        status = 'AVAILABLE'

        const update = await this.collection.child(userId).update({ 'status': status })
        console.log(update)

        return update
    }
}

module.exports = Users