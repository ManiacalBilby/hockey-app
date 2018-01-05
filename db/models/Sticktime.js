const mongoose = require('mongoose')
const Schema = require('../schema')

const Sticktime = mongoose.model('Sticktime', Schema.SticktimeSchema)

module.exports = Sticktime