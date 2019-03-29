const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    console.log('You are in first app.use function');
    next();
});
app.use((req, res, next) => {
    console.log('You are in Second app.use function');
    next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Your server is running');
});

app.get('/login', (req, res) => {
    res.send(`<h1>This is login API</h1>`)
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send(`<h1>This is login API</h1>`)
});

app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});