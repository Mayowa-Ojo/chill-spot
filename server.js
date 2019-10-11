const env            = require('dotenv')
const path           = require('path')
const flash          = require('connect-flash')
const morgan         = require('morgan')
const exphbs         = require('express-handlebars')
const express        = require('express')
const session        = require('express-session')
const passport       = require('passport')
const methodOverride = require('method-override')
// *************************************************
// relative imports
const userRouter     = require('./src/routes/user')
const spotRouter     = require('./src/routes/spot')
const commentRouter  = require('./src/routes/comment')
  
/** config */
const app = express()
env.config()

require('./src/config/sequelize/associations')
require('./src/config/passport')(passport)

/** global variables */
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const SECRET = process.env.SECRET

/** middleware */
app.use(morgan(':method :url :status'))
// express parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// method override
app.use(methodOverride('_method'))
app.use(express.static('./src/lib'))
app.set('views', path.join(__dirname, './src/views'))
// handlebars
app.engine('.hbs', exphbs({ extname: '.hbs'}))
app.set('view engine', '.hbs')
// express session
app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: true
}))
// passport
app.use(passport.initialize())
app.use(passport.session())
// connect-flash
app.use(flash())
// middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})
// express router
app.use('/spots', spotRouter)
app.use('/users', userRouter)
app.use('/comments', commentRouter)


app.get('/', (req, res) => {
  res.render('landing', { layout: false })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${NODE_ENV}`)
})