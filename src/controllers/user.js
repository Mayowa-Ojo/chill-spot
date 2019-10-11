const passport = require('passport')
// *********************************
const { User } = require('../config/sequelize/associations')
const { displayFlashMessage, checkUser } = require('../helpers')

/** show sign up form */
exports.registerForm = (_, res) => {
  const css = '/styles/users/user.css'
  res.render('./users/register', {
    static: { css },
    helpers: {
      displayFlashMessage,
      checkUser
    }
  })
}

/** user sign up */
exports.registerUser = (req, res) => {
  const {email, password, confirmPassword, username, name, agree} = req.body
  const newUser = {
    email,
    username,
    name,
    password
  }
  console.log(agree)
  User.findOne({
    where: {
      email
    }
  })
  .then(user => {    
    if(user) {
      // res.json({message: 'email already exists'})
      req.flash('error', ['email already exists', 'please use another email'])
      res.redirect('back')
    } else if(password !== confirmPassword) {
      req.flash('error', ['passwords do not match', 'please confirm your password'])
      res.redirect('back')
    } else if(agree == undefined) {
      req.flash('error', 'check the terms and conditions')
      res.redirect('back')
    } else {
      User.create(newUser)
        .then(user => {
          // res.json(user)
          passport.authenticate('local')(req, res, () => {
            req.flash('success', [`Welcome to chill-spot, ${user.username}`, 'You are now logged in'])
            res.redirect('/spots')
            // res.json({message: `Your account has been created, ${user.username}`})
          })
        })
        .catch(err => {
          req.flash('error', [`${err.message}`, 'please try again'])
          res.redirect('back')
        })
    }
  })
  .catch(err => res.status(500).json({message: err.message}))
}

/** user sign in form */
exports.loginForm = (_, res) => {
  const css = '/styles/users/user.css'
  res.render('./users/login', { 
    static: { css },
    helpers: {
      displayFlashMessage,
      checkUser
    }
  })
}

/** user sign in */
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/spots',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
}

exports.userLogout = (req, res) => {
  req.logout()
  req.flash('success', ['You are now logged out', 'please come back soon'])
  res.redirect('/spots')
}

module.exports = exports