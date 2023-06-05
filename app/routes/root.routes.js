const routes = require('express').Router();

const { registerController } = require('../controllers/register.controller');
const { loginController } = require('../controllers/login.controller');

routes.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  next();
});

routes.get('/', (req, res) => {
  res.render('./pages/home', { title: 'Home' });
});

routes.post('/register', registerController);
routes.post('/login', loginController);

routes.get('/login', (req, res) => {
  res.json({ message: 'Login page' });
});

routes.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
})

exports.routes = routes;
