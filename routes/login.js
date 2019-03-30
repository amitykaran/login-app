const router = require('express').Router();

router.get('/login', (req, res) => {
    console.log('login routes');
    res.status(200).send('<h1>Login Router Called</h1>');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.send(`<h1>This is login API</h1>`);
});

module.exports = router;