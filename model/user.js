const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    refreshToken:{
        type: String
    },
    invitations:{
        type: Number
    },
    roles:{
        user:{
            type: Number,
            default:200
        },
        editor:{},
        admin:{}
    }
})
const user = mongoose.model('user', userSchema)
module.exports = user;