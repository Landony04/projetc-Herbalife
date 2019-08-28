'use strict'

const handlebars = require('handlebars')

function registerHelpers() {
    handlebars.registerHelper('independentPartners', (partners) => {
        const key = Object.keys(partners)
        return key.length
    })

    handlebars.registerHelper('ifEquals', (statusUser, statusValue, options) => {

        if (statusUser === statusValue) {
            return options.fn(this)
        }

        return options.inverse(this)
    })

    return handlebars
}

module.exports = registerHelpers()

