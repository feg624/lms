require('dotenv').config();
const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./passportSetup');
const passport = require('passport');
const authRoute = require('./routes/auth');
const app = express();

app.use(session(
  {
    name: 'session',
    secret: process.env.SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(
  {
    origin: process.env.CLIENT_DOMAIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }
));

app.use('/auth', authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
