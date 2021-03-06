const env            = require('dotenv')
const path           = require('path')
const flash          = require('connect-flash')
const csrf           = require('csurf')
const helmet         = require('helmet')
const morgan         = require('morgan')
const exphbs         = require('express-handlebars')
const express        = require('express')
const session        = require('express-session')
const passport       = require('passport')
const cookieParser   = require('cookie-parser')
const methodOverride = require('method-override')
// *************************************************
// relative imports
const userRouter     = require('./src/routes/user')
const spotRouter     = require('./src/routes/spot')
const mediaRouter    = require('./src/routes/media')
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
app.use(helmet())
app.use(morgan('dev'))
app.use(cookieParser())
// express parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// csrf protection
// app.use(csrf({ cookie: true }))
// method override
app.use(methodOverride('_method'))
app.use(express.static('./src/public'))
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
  res.locals.currentUser = req.user
  next()
})
// express router
app.use('/spots', spotRouter)
app.use('/users', userRouter)
app.use('/media', mediaRouter)
app.use('/comments', commentRouter)

app.get('/', (req, res) => {
  res.render('landing', { layout: false })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${NODE_ENV}`)
})