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

    async getOne(id) {
        const query = await this.collection.child(id).once('value')
        const data = query.val()
        return data
    }

    async getOrders() {
        const query = await this.collection.once('value')
        const data = query.val()

        return data
    }

    async deliveredOrder(orderId) {
        return await this.collection.child(orderId).update({
            status: 'DELIVERED'
        }, function (error) {
            if (error) {
                console.log(error)
            } else {
                console.log('success')
            }
        });
    }
}

module.exports = Orders