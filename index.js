const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');//place models user above passport otherwise you will get an error.
require('./services/passport');



//Connect to mongoDb
mongoose.connect(keys.mongoURI);

const app = express();

// Cookies
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //cookie will last 30 days before expire
        keys: [keys.cookieKey]
    })
);

//Passport to handle cookies
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoute')(app);
// env: environment; heroku port setup
const PORT = process.env.PORT || 5000;
// port at localhost
app.listen(PORT);