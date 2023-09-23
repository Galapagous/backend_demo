const mongoose = require('mongoose')

const moodSchema = new mongoose.Schema({
    Feeling: {
        type: Number,
        required
    },
    Note: String
},
{
    timestamps: true
})

const userMood = mongoose.model('UserMood', moodSchema)
module.exports = userMood