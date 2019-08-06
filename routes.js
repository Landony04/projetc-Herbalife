'use strict'

const Joi = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')

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
                    password: Joi.string().required().min(6)
                }
            }
        },
        handler: user.createUser
    },
    {
        method: 'GET',
        path: '/login',
        handler: site.login
    },
    {
        method: 'GET',
        path: '/register',
        handler: site.register
    },
    {
        method: 'POST',
        path: '/validate-user',
        options: {
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(6)
                }
            }
        },
        handler: user.validateUser
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
    }
]