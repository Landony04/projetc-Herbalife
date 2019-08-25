'use estrict'

const Boom = require('boom')
const users = require('../models/index').users

async function createUser(req, h) {
    let result

    try {
        result = await users.create(req.payload, req.state.user)
    } catch (error) {
        console.error(error)
        return h.view('register', {
            title: 'Registro',
            error: 'Error creando el usuario'
        })
    }

    return h.view('register', {
        title: 'Registro',
        success: 'Usuario creado exitosamente'
    })
}

function failValidation(req, h, error) {
    const templates = {
        '/create-user': 'register',
        '/validate-user': 'login',
        '/create-product': 'product'
    }
    return h.view(templates[req.path], {
        title: 'Error de validacion',
        error: 'Por favor complete los campos requeridos'
    }).code(400).takeover()
}

function logout(req, h) {
    return h.redirect('/login').unstate('user')
}

async function validateUser(req, h) {
    let result

    try {
        result = await users.validateUser(req.payload)

        if (!result) {
            console.log("!result")
            return h.view('login', {
                title: 'Login',
                error: 'Email y/o contraseña incorrecta'
            })
        }
    } catch (error) {
        console.log("error")
        console.error(error)
        return h.view('login', {
            title: 'Login',
            error: 'Problemas validando el usuario'
        })
    }

    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email,
        role: result.role
    })
}

async function setInvalidateUser(req, h) {
    let result

    try {
        result = await req.server.methods.setInvalidateUser(req.params.id)

        if (!result) {
            console.log('!result')
            return notFound(req, h)
        }
    } catch (error) {
        console.error(error)
    }

    return h.view('users', {
        title: 'Socios',
        user: req.state.user,
        key: req.params.id,
        success: 'Se ha deshabilitado el usuario'
    })
}

module.exports = {
    createUser: createUser,
    failValidation: failValidation,
    logout: logout,
    setInvalidateUser: setInvalidateUser,
    validateUser: validateUser
}