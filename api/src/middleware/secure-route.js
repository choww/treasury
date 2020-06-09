// redirect to login page if user is not authenticated
const secureRoute = (req, res, next) => {
  if (req.user) return next();

  req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

module.exports = secureRoute
