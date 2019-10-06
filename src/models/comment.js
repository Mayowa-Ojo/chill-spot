const { STRING, UUID } = require('sequelize')
const uuid = require('uuid/v4')
// **********************************************
const { sequelize } = require('../config/sequelize/sequelize')
// const Spot = require('./spot')

const Comment = sequelize.define('comment', {
  id: {
    type: UUID,
    primaryKey: true,
    allowNull: false
  },
  content: {
    type: STRING,
    allowNull: false
  },
  spotId_fk: {
    type: UUID
  }
})

// create a model hook to set the id
Comment.addHook('beforeValidate', (comment, options) => {
  comment.id = uuid()
})

module.exports = Comment