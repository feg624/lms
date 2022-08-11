import express from 'express';
import passport from 'passport';
import { userInfoHandler, logoutHandler } from '../controllers/auth.controller';

const CLIENT_HOME_URL = `${process.env.CLIENT_DOMAIN}/`;
const CLIENT_OAUTH_FAILURE_URL = `${process.env.CLIENT_DOMAIN}/login?oauth_login_failure=true`;
const CLIENT_LOCAL_AUTH_FAILURE_URL = `${process.env.CLIENT_DOMAIN}/login?local_login_failure=true`;

const router = express.Router();

router.get('/userinfo', userInfoHandler);

router.get('/logout', logoutHandler);

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: CLIENT_HOME_URL,
  failureRedirect: CLIENT_OAUTH_FAILURE_URL
}));

router.post('/login', passport.authenticate('local', {
  successRedirect: CLIENT_HOME_URL,
  failureRedirect: CLIENT_LOCAL_AUTH_FAILURE_URL
}));

export default router;
