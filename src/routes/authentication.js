import express from 'express';
import passport from 'passport';
import url from 'url';
import util from 'util';
import querystring from 'querystring';

var router = express.Router();

router.get('/login', 
  passport.authenticate('auth0', {
    scope: 'email profile',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

router.get('/callback', (req, res, next) => {
  passport.authenticate('auth0', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/login');

    req.logIn(user, err => {
      if (err) return next(err);

      // redirect to previously requested URL or to /
      const { returnTo } = req.session;
      delete req.session.returnTo;
      res.redirect(returnTo || '/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();

  let returnTo = req.protocol + '://' + req.hostname;
  const port = req.connection.localPort;

  if (port && port !== 80 && port !== 443) {
    const isProd = process.env.NODE_ENV === 'production'
    returnTo = isProd ? `${returnTo}/` : `${returnTo}:${port}/`;
  }

  const logoutURL = new URL(
    util.format('http://%s/logout', process.env.AUTH0_DOMAIN)
  );
  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo,
  });

  logoutURL.search = searchString;

  res.redirect(logoutURL);
});

module.exports = router;
