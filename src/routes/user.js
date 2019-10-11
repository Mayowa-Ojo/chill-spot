const express = require('express')
// ----------------------------
const { registerForm, registerUser, loginForm, loginUser, userLogout } = require('../controllers/user')

/* user routes */
const router = express.Router()

// show sign up form
router.get('/register', registerForm)

// register user
router.post('/register', registerUser)

// show login form
router.get('/login', loginForm)

// login user
router.post('/login', loginUser)

// user logout
router.get('/logout', userLogout)

module.exports = router