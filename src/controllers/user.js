const Spot = require('../models/user')

/** show sign up form */
exports.registerForm = (_, res) => {
  const css = '/styles/users/user.css'
  res.render('./users/register', { css })
}

/** user sign up */
exports.register = (req, res) => {

}

/** user sign in */
exports.loginForm = (_, res) => {
  const css = '/styles/users/user.css'
  res.render('./users/login', { css })
}

module.exports = exports