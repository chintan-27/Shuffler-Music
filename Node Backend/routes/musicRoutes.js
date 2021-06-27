const express = require('express');
const ArtistSong = require('../models/ArtistSong');
const router = express.Router();
const User = require('../models/User');
const SongHeard = require("../models/SongHeard");
const LikedSong = require("../models/LikedSong");
const PlayList = require("../models/PlayList");
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();


router.post("/songheard", (req, res) => {
    axios.post(process.env.FLASK_URI + "songname", { name: req.body.name })
        .then((response) => {
            const song = new SongHeard({
                user_id: req.user._id,
                name: req.body.name,
                year: response.data[0]['year'],
                duration: req.body.duration
            })
            song.save((err) => {
                if (err) { res.json({ "error": err }); }
                else { res.json({ "message": "Successful" }) }
            })
        }).catch((err) => {
            res.json({ "error": err })
        });
});


router.post("/songdetails", (req, res) => {
    axios.post(process.env.FLASK_URI + "songname", { name: req.body.name.trim() })
        .then((response) => {
            // console.log(res);
            res.json(response.data)
        }).catch((err) => {
            res.json({ "error": err })
        })
})

router.post("/artist", (req, res) => {
    ArtistSong.findOne({ name: req.body.artist.trim() }, (err, data) => {
        if (err) {
            res.json({ "error": err });
        }
        if (data) {
            res.send(data);
        } else {
            axios.post(process.env.FLASK_URI + "songsbyartist", { artist: req.body.artist.trim() })
                .then((response) => {
                    const songsByArtist = new ArtistSong({
                        name: req.body.artist,
                        songs: response.data
                    })
                    songsByArtist.save((err) => {
                        if (err) {
                            res.json({ "error": err })
                        }
                    });
                    res.json(response.data)
                }).catch((err) => {
                    res.json({ "error": err })
                })
        }
    });
})

router.post("/recommendsongs", (req, res) => {
    SongHeard.find({ user_id: req.user._id }, (err, data) => {
        if (err) {
            res.json({ "error": err });
        }
        if (data) {
            if (data.length > 10) {
                const newdata = data.map(data => {
                    delete data._id;
                    delete data.user_id;
                    delete data.__v;
                    return data;
                });
                axios.post(process.env.FLASK_URI + "songs", { songs: newdata, number: req.body.number })
                    .then((response) => {
                        res.send(response.data)
                    })
                    .catch((err) => {
                        res.json({ "error": err })
                    })
            } else {
                res.json({
                    "songs": [
                        {
                            "artists": "['Arijit Singh']",
                            "name": "Tum Hi Ho",
                            "year": 2013
                        },
                        {
                            "artists": "['Pritam', 'Sunidhi Chauhan', 'Amitabh Bhattacharya']",
                            "name": "Kamli",
                            "year": 2012
                        },
                        {
                            "artists": "['Yo Yo Honey Singh']",
                            "name": "Love Dose",
                            "year": 2013
                        },
                        {
                            "artists": "['Badshah']",
                            "name": "Paagal",
                            "year": 2019
                        },
                        {
                            "artists": "['Badshah']",
                            "name": "Galliyan",
                            "year": 2014
                        },
                        {
                            "artists": "['A.R. Rahman']",
                            "name": "Khwaja Mere Khwaja",
                            "year": 2007
                        },
                        {
                            "artists": "['A.R. Rahman', 'Badshah', 'Tanishk Bagchi', 'Shashaa Tirupati', 'Jubin Nautiyal']",
                            "name": "The Humma Song",
                            "year": 2017
                        },
                        {
                            "artists": "['Arijit Singh']",
                            "name": "Sawan Aaya Hai",
                            "year": 2018
                        },
                        {
                            "artists": "['Amit Trivedi']",
                            "name": "Naina Da Kya Kasoor",
                            "year": 2018
                        }
                    ]
                });
            }
        }
    })
});

router.get("/recommendartist", (req, res) => {
    SongHeard.find({ user_id: req.user._id }, (err, data) => {
        if (err) {
            res.json({ "error": err });
        }
        if (data) {
            if (data.length >= 10) {
                axios.post(process.env.FLASK_URI + "artists", { songs: data })
                    .then((response) => {
                        res.send(response.data)
                    })
                    .catch((err) => {
                        res.json({ "error": err })
                    })
            }
            // console.log(b)
            else {
                res.json({
                    "artists": [
                        {
                            "count": 15,
                            "name": "Arijit Singh"
                        },
                        {
                            "count": 15,
                            "name": "Dua Lipa"
                        },
                        {
                            "count": 15,
                            "name": "Jubin Nautiyal"
                        },
                        {
                            "count": 15,
                            "name": "Shreya Ghoshal"
                        },
                        {
                            "count": 15,
                            "name": "A.R. Rahman"
                        },
                    ]
                });
            }
        }
    })
});

router.post("/search", (req, res) => {
    // console.log(req.query.query)
    axios.post(process.env.FLASK_URI + "search", { "query": req.body.query })
        .then((data) => {
            res.send(JSON.parse(data['data']));
        })
        .catch(err => {
            res.send({ "error": err });
        })
});

router.post("/likedsongs", (req, res) => {
    if (req.body.like) {
        LikedSong.findOneAndDelete({ user_id: req.user._id, name: req.body.name }, (err, data) => {
            if (err) console.log(err);
            else {
                // console.log(data);
                res.send(data);
            }
        })
    } else {
        LikedSong.find({ user_id: req.user._id, name: req.body.name }, (err, data) => {
            if (err) {
                console.log(err);
            }
            if (data) {
                if (data.length > 0) {
                    res.send(data);
                }
                else {
                    const like = new LikedSong({
                        user_id: req.user._id,
                        name: req.body.name,
                        artist: req.body.artist,
                    })
                    like.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log("Success");
                            res.send("Added");
                        }
                    })
                }
            }

        })

    }
})

router.get("/likedsongs", (req, res) => {
    LikedSong.find({ user_id: req.user._id }, (err, data) => {
        if (err) console.log(err);
        else {
            res.send(data);
        }
    })
})

router.post("/playlist", (req, res) => {
    if (req.body.add) {
        PlayList.findOneAndDelete({ user_id: req.user._id, name: req.body.name }, (err, data) => {
            if (err) console.log(err);
            else {
                // console.log(data);
                res.send(data);
            }
        })
    } else {
        PlayList.find({ user_id: req.user._id, name: req.body.name }, (err, data) => {
            if (err) {
                console.log(err);
            }
            if (data) {
                if (data.length > 0) {
                    res.send(data);
                }
                else {
                    const add = new PlayList({
                        user_id: req.user._id,
                        name: req.body.name,
                        artist: req.body.artist,
                    })
                    add.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // console.log("Success");
                            res.send("Added");
                        }
                    })
                }
            }

        })

    }
})

router.get("/playlist", (req, res) => {
    PlayList.find({ user_id: req.user._id }, (err, data) => {
        if (err) console.log(err);
        else {
            // console.log(data);
            res.send(data);
        }
    })
})

module.exports = router