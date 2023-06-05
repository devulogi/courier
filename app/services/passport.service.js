const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

exports.setupPassport = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        const formattedPassword = password.toLowerCase();
        try {
          const user = await User.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'Incorrect email' });
          }
  
          const isMatch = await bcrypt.compare(formattedPassword, user.password);
  
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
          }
  
          return done(null, user);
        } catch (err) {
          console.log({
            message: 'Error authenticating user',
            hint: 'Check if the user exists',
            err,
            origin: 'passport.authenticate - local strategy',
          });
          done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      console.log({
        message: 'Error deserializing user',
        hint: 'Check if the user exists',
        err,
        origin: 'passport.deserializeUser',
      });
      done(err);
    }
  });
};
