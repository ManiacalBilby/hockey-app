require('dotenv').config()

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
//mongoose connection
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
  console.log('Mongoose has connected to MongoDB')
})

mongoose.connection.on('error', (error) => {
  console.error(`MongoDB connection error! ${error}`)
  process.exit(-1)
})
//controllers
const userController = require('./routes/userController')
const rinkController = require('./routes/rinkController')
const sticktimeController = require('./routes/sticktimeController')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.get ('/', (request, response) => {
  response.redirect('/users')
})

app.use('/users', userController)
app.use('/users/:userId/rinks', rinkController)
app.use('/users/:userId/rinks/:rinkId/sticktimes', sticktimeController)

// catch 404 and forward to error handler
app.use(function(request, response, next) {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// error handler
app.use(function(error, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = error.message
  response.locals.error = require.app.get('env') === 'development' ? error : {}

  // render the error page
  response.status(error.status || 500)
  response.render('error')
})

module.exports = app
