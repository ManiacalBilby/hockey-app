const mongoose = require('mongoose')
const Schema = require('../schema')

const Rink = mongoose.model('Rink', Schema.RinkSchema)

module.exports = Rink