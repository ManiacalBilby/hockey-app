const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = UserSchema