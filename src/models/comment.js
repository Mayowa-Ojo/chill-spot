const { STRING, UUID, INTEGER } = require('sequelize')
const uuid = require('uuid/v4')
// **********************************************
const { sequelize } = require('../config/sequelize/sequelize')
// const Spot = require('./spot')

const Comment = sequelize.define('comment', {
  id: {
    type: UUID,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  content: {
    type: STRING,
    allowNull: false
  },
  likes: {
    type: INTEGER,
    defaultValue: 0
  },
  spotId_fk: {
    type: UUID,
    allowNull: false
  },
  userId_fk: {
    type: UUID,
    allowNull: false
  }
})

// create a model hook to set the id
Comment.addHook('beforeValidate', (comment, options) => {
  comment.id = uuid()
})

module.exports = Comment