const bcrypt = require('bcrypt');

const User = require('../models/user.model');

exports.registerController = async (req, res, next) => {
  const { email, password, password2 } = req.body;

  const formattedEmail = email.toLowerCase();
  const formattedPassword = password.toLowerCase();
  const formattedPassword2 = password2.toLowerCase();
  
  try {
    const isEmailTaken = await User.exists({ email: formattedEmail });

    if (isEmailTaken) {
      req.flash('error', 'Email is already taken');
      // return res.status(400).send({
      //   message: 'Email is already taken',
      //   hint: 'Try another email',
      //   origin: 'User.exists',
      // });
      return res.redirect('/');
    }
  }
  catch (err) {
    req.flash('error', 'Error checking if email is taken');
    return res.status(500).send({
      message: 'Error checking if email is taken',
      hint: 'Check if the email is valid',
      err,
      origin: 'User.exists',
    });
  }

  if (formattedPassword !== formattedPassword2) {
    req.flash('error', 'Passwords do not match');
    // return res.status(400).send({
    //   message: 'Passwords do not match',
    //   hint: 'Check if the passwords match',
    //   origin: 'Register controller',
    // });
    return res.redirect('/');
  }

  const hashedPassword = await bcrypt.hash(formattedPassword, 10);

  const newUser = new User({
    email: formattedEmail,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    
    return res.status(200).send({
      message: 'User saved successfully',
      user: newUser,
    });
  }
  catch (err) {
    req.flash('error', 'Error saving user');
    return res.status(500).send({
      message: 'Error saving user',
      hint: 'Check if the user already exists',
      err,
      origin: 'newUser.save',
    });
  }  
}
