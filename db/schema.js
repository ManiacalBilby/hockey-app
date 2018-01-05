const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SticktimeSchema = new Schema({
    dayOfWeek: {
        type: String,
        required: [ true, 'Sticktime day is required' ]
    },
    time: {
        type: String,
        required: [ true, 'Why do you think they call it stickTIME?' ]
    },
    price: {
        type: Number,
        required: [ true, 'Sticktime price is required!' ]
    }
})

const RinkSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Rink name is required']
    },
    photoUrl: {
        type: String
    },
    phone: {
        type: String
    },
    sticktimes: [ SticktimeSchema ]
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
    rinks: [ RinkSchema ]
},
{
    timestamps: {},
    usePushEach: true

})

module.exports = {
    UserSchema,
    RinkSchema,
    SticktimeSchema
}