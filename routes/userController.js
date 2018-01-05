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

module.exports = router
