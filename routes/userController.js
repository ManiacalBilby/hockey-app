const express = require('express');
const router = express.Router();
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', function(require, response, next) {
  response.send('respond with a resource');
});

module.exports = router;
