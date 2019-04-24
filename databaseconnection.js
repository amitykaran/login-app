const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8000;

const user = require('./controller/user');

mongoose.connect('mongodb://localhost:27017/personalprojects', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', function (err) {
    console.log(JSON.stringify(err));
});
db.on('connected', function () { 
    console.log('db connection open');
});
db.on('disconnected', function () { 
    console.log('Mongoose default connection disconnected');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', user);

app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});