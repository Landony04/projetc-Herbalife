'use strict'

const products = require('../models/index').products

async function createProduct(req, h) {
    let result
    try {
        result = await products.create(req.payload, req.state.user)
        console.log(`Producto creado con ID ${result}`)
    } catch (error) {
        console.error(error)
        return h.view('product', {
            title: 'Producto',
            error: 'Error al crear el producto'
        }).code(500).takeover()
    }

    return h.view('product', {
        title: 'Producto',
        success: 'Producto creado exitosamente'
    })
}

module.exports = {
    createProduct: createProduct
}