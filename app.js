const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = 3000;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
};
const isProduction = process.env.NODE_ENV === 'production';

const login = require('./routes/login');

// app.use((req, res, next) => {
//     console.log('You are in first app.use function');
//     next();
// });
// app.use((req, res, next) => {
//     console.log('You are in Second app.use function');
//     next();
// });
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/', login);

// app.get('/', (req, res) => {
//     res.send('Your server is running');
// });

app.get('/login', (req, res) => {
    res.send(`<h1>This is login API</h1>`)
});



app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});