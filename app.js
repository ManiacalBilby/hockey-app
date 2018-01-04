require('dotenv').config()

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const userController = require('./controllers/userController')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get ('/', (request, response) => {
  response.redirect('/users')
})
app.use('/users', userController)

// catch 404 and forward to error handler
app.use(function(require, response, next) {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

// error handler
app.use(function(error, require, response, next) {
  // set locals, only providing error in development
  response.locals.message = error.message
  response.locals.error = require.app.get('env') === 'development' ? err : {}

  // render the error page
  response.status(error.status || 500)
  response.render('error')
})

module.exports = app
