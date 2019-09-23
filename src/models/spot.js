const { STRING, DATE } = require('sequelize')
const { sequelize } = require('../config/sequelize')

/** define a model for a chill spot */
const Spot = sequelize.define('spot', {
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
  date: {
    type: DATE,
    allowNull: false
  }
},
{
  timestamps: false
})

module.exports = Spot