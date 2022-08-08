import 'dotenv/config';
import express from 'express';
import session from 'cookie-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import './passportSetup';
import passport from 'passport';
import authRoute from './routes/auth';

// Workaround to add attributes to the Passport User
declare global {
  namespace Express {
    interface User {
      displayName: string;
      email: string;
      picture: string;
    }
  }
};

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
