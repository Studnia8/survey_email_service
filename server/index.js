const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./models/users');
require('./services/passport');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey],
}));
app.use(passport.initialize()); // middleware
app.use(passport.session()); // middleware

require('./routes/authRoutes')(app);

const port = process.env.PORT || 3000;
app.listen(port);
//test