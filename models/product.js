'use strict'

class Products {
    constructor(db) {
        this.db = db
        this.ref = this.db.ref('/')
        this.collection = this.ref.child('products')
    }

    async create(data, user) {
        data.owner = user
        const product = this.collection.push()
        product.set(data)

        return product.key
    }

    async getLast(amount) {
        const query = await this.collection.limitToLast(amount).once('value')
        const data = query.val()
        return data
    }

    async getOne(id) {
        const query = await this.collection.child(id).once('value')
        const data = query.val()

        return data
    }
}

module.exports = Products