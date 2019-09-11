'use strict'

const orders = require('../models/index').orders

async function createOrder(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }

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

    return h.view('/add-orders', {
        title: 'Pedido',
        success: 'Pedido creado exitosamente'
    })
}

async function deliveredOrder(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }

    let result

    try {

        result = await req.server.methods.deliveredOrder(req.params.id)
    } catch (error) {
        console.error(error)
    }

    return h.redirect('/orders-admin', {
        title: 'Ordenes',
        user: req.state.user,
        key: req.params.id,
        success: 'Se ha liberado la orden'
    })
}

module.exports = {
    createOrder: createOrder,
    deliveredOrder: deliveredOrder
}