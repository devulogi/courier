const passport = require('passport');

exports.loginController = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // Handle any errors that occurred during authentication
      return next(err);
    }

    if (!user) {
      // If authentication failed, display the error message
      req.flash('error', info.message);
      return res.redirect('/');
    }

    // If authentication succeeded, log in the user
    req.logIn(user, (err) => {
      if (err) {
        // Handle any errors that occurred during login
        return next(err);
      }

      // Return a success message or redirect to a different page
      return res.redirect('/');
    });
  })(req, res, next);
}
