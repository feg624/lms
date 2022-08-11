import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmail } from '../services/auth.service';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await findUserByEmail(profile.email);
    if (user) {
      done(null, {...profile, userEntity: user});
    }
    else {
      done(null, false);
    }
  }
));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(email, password, done) {
    // TODO: So far, not checking the password, just looking for existing user with matching email
    const user = await findUserByEmail(email);
    if (user) {
      done(null, {
        displayName: user.name,
        email: email,
        picture: null,
        userEntity: user
      });
    }
    else {
      done(null, false);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: Express.User, done) {
  done(null, user);
});
