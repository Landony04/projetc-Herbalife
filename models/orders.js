'use strict'

class Orders {
    constructor(db) {
        this.db = db
        this.ref = this.db.ref('/')
        this.collection = this.ref.child('orders')
    }

    async create(data, user) {
        data.owner = user
        const order = this.collection.push()
        order.set(data)

        return order.key
    }

    async getOrders() {
        const query = await this.collection.once('value')
        const data = query.val()

        return data
    }
}

module.exports = Orders