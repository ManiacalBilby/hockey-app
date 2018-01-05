const express = require('express')
const router = express.Router()
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', function(request, response, next) {
  User.find({})
    .then((user) => {
      response.render
    })
})

module.exports = router
