const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sticktimeSchema = new Schema({
    dayOfWeek: {
        type: String,
        required: [ true, 'Sticktime day is required' ]
    },
    Time: {
        type: Number,
        required: [ true, 'Why do you think they call it stickTIME?' ]
    },
    price: {
        type: Number,
        required: [ true, 'Sticktime price is required!' ]
    }
})

const rinkSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Rink name is required']
    },
    photoUrl: {
        type: String
    },
    phone: {
        type: Number
    },
    // sticktimes: [ sticktimeSchema ]
})

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [ true, 'First name is required!']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!']
    },
    photoUrl: {
        type: String
    },
    // rinks: [ RinkSchema ]
},
{
    timestamps: {},
    usePushEach: true

})

module.exports = {UserSchema}