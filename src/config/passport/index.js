const { Strategy: LocalStrategy} = require('passport-local')
// *********************************
const { User } = require('../sequelize/associations')

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
      // find user
      User.findOne({ 
        where: {
          email
        }
      })
      .then(user => {
        if(!user) return done(null, false, {message: 'user doesn\'t exist'})

        user.validatePassword(password)
          .then(isValid => {
            if(isValid) {
              done(null, user)
            } else done(null, false, {message: 'incorrect password'})
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}