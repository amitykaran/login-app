const express = require('express');
const _ = require('lodash');


const router = express.Router() ;
const userModel = require('../models/signup');


router.post('/add-user', (req, res) => {
    let user = {};
    if(req.body.user) {
        user = req.body.user;
    }
    console.log('req received is ', req.body);
    if(!_.isEmpty(user)) {
        console.log(`${user.name} received`);
        let newUser = new userModel(user);
        newUser.save((err, object) => {
            if(err){
                console.log(err);
            } else {
                console.log(`${object} saved successfully`);
            }
        });

    } else {
        console.log('User NOT found');
    }
    res.send('this is response from add-user');
});

module.exports = router;