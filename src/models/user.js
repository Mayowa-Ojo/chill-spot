const { STRING, UUID } = require('sequelize')
const uuid = require('uuid/v4')
const bcrypt = require('bcryptjs')
// **********************************************
const { sequelize } = require('../config/sequelize/sequelize')

const User = sequelize.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 15],
        msg: 'password must be at least 6 characters'
      }
    }
  },
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'email is not a valid email'
      }
    }
  },
  avatar: {
    type: STRING,
    allowNull: false,
    defaultValue: "/public/assets/images/avatar-1.png"
  },
  spotId_fk: {
    type: UUID
  }
})

// instance methods
User.prototype.validatePassword = async function(password) {
  try {
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
  } catch(err) {
    throw new Error(err)
  }
}
// create a model hook to set the id
User.addHook('beforeValidate', (user, options) => {
  // set id field to uuid
  user.id = uuid()  
})

User.addHook('afterValidate', async (user, options) => {
  const password = user.password
  // hash password
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)
})

module.exports = User