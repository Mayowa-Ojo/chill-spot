const { STRING, UUID, INTEGER } = require('sequelize')
const uuid = require('uuid/v4')
// *************************************************
const { sequelize } = require('../config/sequelize/sequelize')

const Media = sequelize.define('media', {
  id: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  url: {
    type: STRING,
    allowNull: false
  },
  publicId: {
    type: STRING,
    allowNull: false
  },
  spotId_fk: {
    type: UUID
  }
})

Media.addHook('beforeValidate', (media, options) => {
  const id = uuid()
  media.id = id
})

module.exports = Media
