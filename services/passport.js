const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


//model class from user.js
const User = mongoose.model('users');

passport.serializeUser((user, done) =>{
    done(null, user.id); // is _id not profileId, profileId is googleId
});

//Turn back id in model mongoose instance
passport.deserializeUser((id, done) =>{
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

// Strategy of google used
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) =>{
        //Avoid user Duplication
        User.findOne({ googleId: profile.id })
            .then((existingUser) =>{
                if(existingUser){
                    // we have records non need to create other id, null means non error, we found existing user
                    done(null, existingUser );
                }else{
                    //non records we create an id for new user
                    // new model instance of user and saved
                    new User({ googleId: profile.id })
                        .save()  // user model instance saved
                        .then(user => done(null, user));  // callback instance with user saved
                }
            });
        // console.log('access token', accessToken);
        // console.log('refresh token', refreshToken);
        // console.log('profile', profile);
    })
);