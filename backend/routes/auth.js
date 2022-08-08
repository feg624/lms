const router = require('express').Router();
const passport = require('passport');

const CLIENT_HOME_URL = `${process.env.CLIENT_DOMAIN}/`;
const CLIENT_OAUTH_FAILURE_URL = `${process.env.CLIENT_DOMAIN}/login?oauth_login_failure=true`;
const CLIENT_LOCAL_AUTH_FAILURE_URL = `${process.env.CLIENT_DOMAIN}/login?local_login_failure=true`;

router.get('/userinfo', (req, res) => {
  if (req.user) {
    res.status(200).json({
      name: req.user.displayName,
      email: req.user.email,
      picture: req.user.picture
    });
  }
  else {
    res.status(401).json(null);
  }
});

router.get('/logout', async (req, res) => {
  await req.logout();
  req.session = null;
  req.sessionOptions.maxAge = 0;
  return res.redirect(CLIENT_HOME_URL);
});

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

module.exports = router;
