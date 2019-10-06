const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const tweetEventsRoutes = require('./routes/tweet-event-routes');
const mongoose = require('mongoose');
const cors = require('cors');
const socket = require('./helpers/socket');
const uuid = require('uuid/v4');
const security = require('./helpers/security');

const app = express();
require('./config/passport-setup');
const port = process.env.PORT;

// mongodb atlas setup
mongoose.connect(
  process.env.MONGODB_URI,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log('connected to mongo db');
  },
);
mongoose.connection.on('error', err => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 1209600000}, // two weeks in milliseconds
  }),
);

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: process.env.CLIENT_URL, // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    crossDomain: true,
    credentials: true, // allow session cookie from browser to pass through
  }),
);

// create server
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}!`),
);

// initialize socket.io
socket.init(server);

// set up routes
app.use('/auth', authRoutes);
app.use('/event/tweet', tweetEventsRoutes);

/**
 * Receives challenge response check (CRC)
 **/
app.get('/webhook/twitter', function(request, response) {
  var crc_token = request.query.crc_token;

  if (crc_token) {
    var hash = security.get_challenge_response(
      crc_token,
      process.env.TWITTER_API_SECRET_KEY,
    );

    response.status(200);
    response.send({
      response_token: 'sha256=' + hash,
    });
  } else {
    response.status(400);
    response.send('Error: crc_token missing from request.');
  }
});

/**
 * Receives Account Acitivity events
 **/
app.post('/webhook/twitter', function(request, response) {
  socket.io.emit('event', {
    internal_id: uuid(),
    event: request.body,
  });

  response.send('200 OK');
});
