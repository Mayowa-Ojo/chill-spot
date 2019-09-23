const Sequelize = require('sequelize')
const env = require('dotenv').config()

/** global variables */
const PG_DATABASE = process.env.PG_DATABASE;
const PG_USERNAME = process.env.PG_USERNAME;
const PG_PASSWORD = process.env.PG_PASSWORD;
/** setup a connection */
const sequelize = new Sequelize(PG_DATABASE, PG_USERNAME, PG_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize
  .authenticate()
  .then(() => {
    console.log(`connected to sql database ${PG_DATABASE}`)
  })
  .catch(err => {
    console.error('connection to sql database failed ', err)
  })
  
module.exports = { sequelize }