const mongoose = require('mongoose')

const ArtistSong = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    songs:{
        type: Array,
        required: true,
        default: []
    }
});

const ArtistSongModel = new mongoose.model("ArtistSong",ArtistSong);

module.exports = ArtistSongModel;