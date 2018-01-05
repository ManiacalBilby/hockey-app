const express = require('express')
const router = express.Router()
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', function(request, response, next) {
  User.find({})
    .then((users) => {
      response.render('users/index', {
        users,
        pageTitle: 'Users'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/new', (request, response) => {
  response.render('users/new')
})

router.get('/:userId', (request, response) => {
  const userId = request.params.userId
  User.findById(userId)
    .then((user) => {
      response.render('users/show', {
        user,
        pageTitle: user.firstName
      })
      .catch((error) => {
        console.log(error)
      })
    })
})

module.exports = router
