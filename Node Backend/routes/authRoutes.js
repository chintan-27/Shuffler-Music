const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Authentication Strategy
var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            return done(null, false);
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
// End of Authentication

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
           res.send(err);
        }
        if (data) {
            res.send("User Already Exists !");
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    password = hash;
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: password,
                    });
                    newUser.save(function (err) {
                        if (err) {
                            res.json({"error":err});
                        } else {
                            res.json({"message":"Registered Successfully","user":newUser});
                        }
                    });
                });
            });

        }
    });

});

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json({"error":"No User Exists"});
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.json({"message":"Successfully Authenticated","user":user});
            });
        }
    })(req, res, next);
});

router.get("/currentuser", (req, res) => {
    console.log(req)
    if(req.user){
        res.send(req.user);
    }else{
        res.json({"message":"no user"});
    }
    
});


router.get('/logout', (req, res) => {
    req.logout();
    res.json({"message":"Logged Out Successfully"});
})

module.exports = router