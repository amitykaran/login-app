const router = require('express').Router();

router.get('/profile', (req, res) => {
    res.send(`<h1>You are at profile page</h1>`);
});

module.exports = router;