'use strict'

const products = require('../models/index').products
const users = require('../models/index').users
const orders = require('../models/index').orders

function addPartners(req, h) {
    if (!req.state.user) {
        return h.redirect('/')
    }

    return h.view('add-partners', {
        title: 'Agregar asociado',
        user: req.state.user
    })
}

async function addOrders(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }

    let data
    try {
        data = await products.getProducts()
    } catch (error) {
        console.error(error)
    }

    return h.view('add-orders', {
        title: 'Agregar pedido',
        user: req.state.user,
        products: data
    })
}

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

    return h.view('add-product', {
        title: 'Crear producto',
        user: req.state.user
    })
}

async function getOrders(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }

    let data
    try {
        data = await orders.getOrders()
    } catch (error) {
        console.log(error)
    }

    return h.view('orders-admin', {
        title: 'Listado de ordenes',
        user: req.state.user,
        orders: data
    })
}

async function getOrdersClient(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }

    let data
    try {
        data = await orders.getOrders()
    } catch (error) {
        console.log(error)
    }

    return h.view('orders-client', {
        title: 'Listado de ordenes',
        user: req.state.user,
        orders: data
    })
}

async function getProducts(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }

    let data
    try {
        data = await products.getProducts()
    } catch (error) {
        console.error(error)
    }

    return h.view('products', {
        title: 'Productos',
        user: req.state.user,
        products: data
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

async function viewProduct(req, h) {
    let data

    try {
        data = await products.getOne(req.params.id)
        if (!data) {
            return notFound(req, h)
        }
    } catch (error) {
        console.error(error)
    }

    return h.view('products', {
        title: 'Detalles del producto',
        user: req.state.user,
        product: data,
        key: req.params.id
    })
}

function notFound(req, h) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404)
}

async function user(req, h) {
    if (!req.state.user) {
        return h.redirect('/login')
    }

    let data
    try {
        data = await users.getUsers()
    } catch (error) {
        console.error(error)
    }
    return h.view('users', {
        title: 'Socios',
        user: req.state.user,
        users: data
    })
}

module.exports = {
    addOrders: addOrders,
    addPartners: addPartners,
    fileNotFound: fileNotFound,
    getOrders: getOrders,
    getOrdersClient: getOrdersClient,
    getProducts: getProducts,
    home: home,
    login: login,
    notFound: notFound,
    product: product,
    register: register,
    user: user,
    viewProduct: viewProduct
}