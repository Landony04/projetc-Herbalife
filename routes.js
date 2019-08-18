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
                    status: 'AVAILABLE',
                    gender: Joi.string().required(),
                    age: Joi.string().required(),
                    address: Joi.string().required()
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
                    description: Joi.string().required()
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
        path: '/product',
        handler: site.product
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