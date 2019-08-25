'use strict'

const Joi = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
const product = require('./controllers/product')

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: site.home
    },
    {
        method: 'POST',
        path: '/create-user',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6),
                    status: Joi.string().default('AVAILABLE'),
                    gender: Joi.string().required(),
                    age: Joi.string().required(),
                    address: Joi.string().required(),
                    phone: Joi.string().required().min(8),
                    volume: Joi.number().integer().default(0),
                    level: Joi.number().integer().default(0),
                    orders: Joi.number().integer().default(0),
                    role: Joi.string().default('CLIENT')
                },
                failAction: user.failValidation
            }
        },
        handler: user.createUser
    },
    {
        method: 'POST',
        path: '/create-product',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    description: Joi.string().required(),
                    points: Joi.number().required(),
                    price: Joi.number().required(),
                    status: Joi.string().default('EXISTING'),
                    createAt: Joi.date().timestamp('unix')
                },
                failAction: user.failValidation
            }
        },
        handler: product.createProduct
    },
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        method: 'GET',
        path: '/products/{id}',
        handler: site.viewProduct
    },
    {
        method: 'GET',
        path: '/products',
        handler: site.getProducts
    },
    {
        method: 'GET',
        path: '/logout',
        handler: user.logout
    },
    {
        method: 'GET',
        path: '/register',
        handler: site.register
    },
    {
        method: 'GET',
        path: '/add-partners',
        handler: site.addPartners
    },
    {
        method: 'GET',
        path: '/product',
        handler: site.product
    },
    {
        method: 'GET',
        path: '/users',
        handler: site.user
    },
    {
        method: 'GET',
        path: '/desactive-users/{id}',
        handler: user.setInvalidateUser
    },
    {
        method: 'POST',
        path: '/validate-user',
        options: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6)
                },
                failAction: user.failValidation
            }
        },
        handler: user.validateUser
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    },
    {
        method: ['GET', 'POST'],
        path: '/{any*}',
        handler: site.notFound
    }
]