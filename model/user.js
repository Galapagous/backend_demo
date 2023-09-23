const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        default: null,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Mood:{
        type: Array,
        default:[]
    },
    FavoriteRealxations:{
        type: Array,
        default:[]
    },
    ProfilePix: String,
    Age:Number,
    Location: String,
    City: String
},
{timestamps: true})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel