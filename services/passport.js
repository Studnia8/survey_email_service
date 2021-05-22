const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/dev');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => { // convert user to id for cookies, coding cookie
    done(null, user.id);
});

passport.deserializeUser((id, done) => { // convert id to user from cookies to server, encoding cookie
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new googleStrategy({ // google authorization
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
}, (accessToken, refreshToken, profile, done) => { // profile contains the data about user
    User.findOne({ googleID: profile.id })
        .then((existingUser) => {
            if (existingUser) { // we already have a record in our database
                done(null, existingUser);
            } else {
                new User({
                        googleID: profile.id,
                        displayedName: profile.displayName,
                    }).save()
                    .then(user => done(null, user)); // make sure user has been created and send done to passport
            }
        })
}));