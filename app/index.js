const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
require('dotenv').config();

const { redisClient } = require('./services/redis.service');
const { mongoConnection } = require('./services/mongo.service');
const { setupPassport } = require('./services/passport.service');
const { routes } = require('./routes/root.routes');

/** STORE SESSION IN REDIS */
const redisStore = new RedisStore({
  client: redisClient,
  ttl: 60 * 60 * 1, // 1 hour expiration time in seconds (seconds * minutes * hours)
});
const app = express();

mongoConnection.on('error', err => {
  console.log('MongoDB error: ', err);
})
  .on('connected', () => {
    console.log('MongoDB connected');
  })
  .on('disconnected', () => {
    console.log('MongoDB disconnected');
  });

setupPassport(passport);

app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    cookie: {
      httpOnly: true,
      maxAge: 60000,
    },
    store: redisStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(routes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));