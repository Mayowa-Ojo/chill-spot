const express = require('express')
// ----------------------------
const { registerForm, register, loginForm } = require('../controllers/user')

/* user routes */
const router = express.Router()

// show sign up form
router.get('/register', registerForm)

// register user
router.post('/register', register)

// show login form
router.get('/login', loginForm)

module.exports = router