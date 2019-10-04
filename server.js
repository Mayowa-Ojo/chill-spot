const express = require('express')
const env = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
// -------------------------------
// relative imports
const spotRouter = require('./src/routes/spot')
const userRouter = require('./src/routes/user')
  
/** config */
const app = express()
env.config()
// require('./src/config/sequelize')


/** global variables */
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

/** middleware */
app.use(morgan(':method :url :status'))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./src/lib'))
app.set('views', path.join(__dirname, './src/views'))
app.engine('.hbs', exphbs({ extname: '.hbs'}))
app.set('view engine', '.hbs')
// express router
app.use('/spots', spotRouter)
app.use('/users', userRouter)


app.get('/', (req, res) => {
  res.render('landing', { layout: false })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${NODE_ENV}`)
})