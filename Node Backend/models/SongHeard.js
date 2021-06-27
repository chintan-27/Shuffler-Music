const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('SongsHeard',songSchema);