'use strict'

const orders = require('../models/index').orders

async function createOrder(req, h) {
    let result
    try {
        result = await orders.create(req.payload, req.state.user)
        console.log(`Pedido creado con ID ${result}`)
    } catch (error) {
        console.error(error)
        return h.view('add-orders', {
            title: 'Pedido',
            error: 'Error al crear el pedido'
        }).code(500).takeover()
    }

    return h.view('add-orders', {
        title: 'Pedido',
        success: 'Pedido creado exitosamente'
    })
}

module.exports = {
    createOrder: createOrder
}