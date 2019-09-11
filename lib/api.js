'use strict'

const authBasic = require('hapi-auth-basic')
const Boom = require('boom')
const Joi = require('joi')
const orders = require('../models/index').orders
const users = require('../models/index').users

module.exports = {
    name: 'api-rest',
    version: '1.0',
    async register(server, options) {
        const prefix = options.prefix || 'api'

        await server.register(authBasic)
        server.auth.strategy('simple', 'basic', { validate: validateAuth })

        server.route({
            method: 'GET',
            path: `/${prefix}/orders/{key}`,
            options: {
                auth: 'simple',
                validate: {
                    params: {
                        key: Joi.string().required()
                    },
                    failAction: failValidation
                }
            },
            handler: async (req, h) => {
                let result

                try {
                    result = await orders.getOne(req.params.key)
                    if (!result) {
                        return Boom.notFound(`No se encontro la orden ${req.params.key}`)
                    }
                } catch (error) {
                    return Boom.badImplementation(`Hubo un error buscando ${req.params.key} -- ${error}`)
                }

                return result
            }
        })

        server.route({
            method: 'GET',
            path: `/${prefix}/orders`,
            options: {
                auth: 'simple'
            },
            handler: async (req, h) => {
                let result

                try {
                    result = await orders.getOrders()
                    if (!result) {
                        return Boom.notFound(`No se encontraron ordenes`)
                    }
                } catch (error) {
                    return Boom.badImplementation(`Hubo un error buscando las ordenes -- ${error}`)
                }

                return result
            }
        })

        function failValidation(req, h, err) {
            return Boom.badRequest('Por favor agregue los parametros correctos')
        }

        async function validateAuth(req, username, password, h) {
            let user
            try {
                user = await users.validate({ email: username, password: password })
            } catch (error) {
                console.log('error', error)
            }

            return {
                credentials: user || {},
                isValid: (user != false)
            }
        }
    }
}