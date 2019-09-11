'Use strict'

const handlebars = require('./lib/helpers')
const Hapi = require('hapi')
const good = require('good')
const inert = require('inert')
const methods = require('./lib/methods')
const path = require('path')
const routes = require('./routes')
const site = require('./controllers/site')
const vision = require('vision')

const server = Hapi.Server({
    port: process.env.port || 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }
})

async function init() {

    try {
        await server.register(inert)
        await server.register(vision)
        await server.register({
            plugin: good,
            options: {
                reporters: {
                    console: [
                        {
                            module: 'good-console',
                        },
                        'stdout'
                    ]
                }
            }
        })
        await server.register({
            plugin: require('./lib/api'),
            options: {
                prefix: 'api'
            }
        })

        server.method('setInvalidateUser', methods.setInvalidateUser)
        server.method('setActiveUser', methods.setActiveUser)
        server.method('deliveredOrder', methods.deliveredOrder)

        server.state('user', {
            ttl: 1000 * 60 * 60 * 24 * 7,
            isSecure: process.env.NODE_ENV === 'production',
            encoding: 'base64json'
        })

        server.views({
            engines: {
                hbs: handlebars
            },
            relativeTo: __dirname,
            path: 'views',
            layout: true,
            layoutPath: 'views'
        })

        server.ext('onPreResponse', site.fileNotFound)
        server.route(routes)

        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }

    server.log('info', `Servidor lanzado en: ${server.info.uri}`)
}

process.on('unhandledRejection', error => {
    server.error('handleRejection', error)
})

process.on('unhandledException', error => {
    server.error('unhandledException', error)
})

init()
