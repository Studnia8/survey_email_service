const passport = require('passport');
const env = require('../config/keys');

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));
    app.get('/', (req, res) => {
        res.send(env);
    });
    app.get('/api/logout', (req, res) => {
        req.logout(); // logout function add to passport.js
        res.send(req.user); // should be empty page - there is no req.user
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user); // show current loged in user
    })
};