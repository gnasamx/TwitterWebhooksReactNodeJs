const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();

const CLIENT_URL = process.env.CLIENT_URL;

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'user authentication problem',
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
});

// When logout, redirect to client
router.get('/logout', (req, res) => {
  req.logout();
  // res.redirect(CLIENT_URL);
  res.status(302).json({
    success: true,
    message: 'logout successfully',
  });
});

// auth with twitter
router.get('/twitter', passport.authenticate('twitter'));

// redirect to home page after successfully login via twitter
router.get(
  '/twitter/redirect',
  passport.authenticate('twitter', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/auth/login/failed',
  }),
);

module.exports = router;
