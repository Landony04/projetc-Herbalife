'use strict'

const products = require('../models/index').products

async function home(req, h) {
    let data
    try {
        data = await products.getLast(10)
    } catch (error) {
        console.error(error)
    }
    return h.view('index', {
        title: 'Home',
        user: req.state.user,
        products: data
    })
}

function fileNotFound(req, h) {
    const response = req.response
    if (response.isBoom && response.output.statusCode === 404) {
        return h.view('404', {}, { layout: 'error-layout' }).code(404)
    }

    return h.continue
}

function product(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }

    return h.view('product', {
        title: 'Crear producto',
        user: req.state.user
    })
}

function register(req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }

    return h.view('register', {
        title: 'Registro',
        user: req.state.user
    })
}

function login(req, h) {
    if (req.state.user) {
        return h.redirect('/')
    }

    return h.view('login', {
        title: 'Ingrese',
        user: req.state.user
    })
}

function notFound(req, h) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404)
}

module.exports = {
    home: home,
    fileNotFound: fileNotFound,
    login: login,
    notFound: notFound,
    product: product,
    register: register
}