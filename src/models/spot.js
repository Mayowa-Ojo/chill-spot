const { STRING, UUID } = require('sequelize')
const uuid = require('uuid/v4')
// *************************************************
const { sequelize } = require('../config/sequelize/sequelize')

/** define a model for a chill spot */
const Spot = sequelize.define('spot', {
  id: {
    type: UUID,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false
  },
  location: {
    type: STRING,
    allowNull: false
  },
  image: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: STRING,
    allowNull: false
  },
  price_range: {
    type: STRING,
    allowNull: false
  },
  category: {
    type: STRING,
    allowNull: true
  },
  spotId_fk: {
    type: UUID
  }
})

// create a model hook to set the id to a unique value
Spot.beforeValidate(function(spot, options) {
  return new Promise((resolve, reject) => {
    const id = uuid()
    spot.id = id
    spot.spotId_fk = id
    return resolve(spot, options)
  })
})

module.exports = Spot