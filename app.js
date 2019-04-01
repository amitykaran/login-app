const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const login = require('./routes/login');
const profile = require('./routes/profile');
const users = require('./models/users');
const passport = require('./config/passport');

const app = express();
const PORT = 3000;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
};
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
const isProduction = process.env.NODE_ENV === 'production';

app.use(require('./routes'));
app.use(cors(corsOptions));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

// app.use((req, res, next) => {
//     console.log('You are in first app.use function');
//     next();
// });
// app.use((req, res, next) => {
//     console.log('You are in Second app.use function');
//     next();
// });

app.use('/', login);
app.use('/', profile);

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-tutorial');
mongoose.set('debug', true);

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// app.get('/', (req, res) => {
//     res.send('Your server is running');
// });

app.get('/login', (req, res) => {
    res.send(`<h1>This is login API</h1>`);
});



app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});