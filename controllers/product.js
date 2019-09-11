'use strict'

const products = require('../models/index').products

async function createProduct(req, h) {
    let result
    try {
        result = await products.create(req.payload, req.state.user)
        req.log('info', `Producto creado con ID ${result}`)
    } catch (error) {
        req.log('error', `Ocurrio un error con el ID ${result}`)
        return h.view('product', {
            title: 'Producto',
            error: 'Error al crear el producto'
        }).code(500).takeover()
    }

    return h.view('add-product', {
        title: 'Producto',
        success: 'Producto creado exitosamente'
    })
}

module.exports = {
    createProduct: createProduct
}