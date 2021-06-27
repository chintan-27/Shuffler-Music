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
    artist:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('LikedSong',songSchema);