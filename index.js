'Use strict'

const handlebars = require('./lib/helpers')
const Hapi = require('hapi')
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

        server.method('setInvalidateUser', methods.setInvalidateUser)

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
        process.exit
    }

    console.log(`Servidor lanzado en: ${server.info.uri}`)
}

process.on('unhandledRejection', error => {
    console.error('handleRejection', error.message, error)
})

process.on('unhandledException', error => {
    console.error('unhandledException', error.message, error)
})

init()
