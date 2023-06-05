exports.isAuthenicated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error', 'You must be logged in to view this page');
  return res.redirect('/');
}
