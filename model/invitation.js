const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    invitation_owner:{
        type: String,
        required: true
    },
    invitation_destiny:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})
const user = mongoose.model('invitation', userSchema)
module.exports = user;