const express = require('express');
const _ = require('lodash');


const router = express.Router() ;
const userModel = require('../models/user');


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

router.get('/user-list', (req, res) => {
    let model = {};
    userModel.find((err, list) => {
        if(err){
            console.log('No user found');
            res.json({
                status: 'err',
                error: err
            });
        } else {
            console.log('Here is the list of users', list);
            model.list = list;
            res.json({
                status: 'success',
                list: list
            });
        }
    });

});

module.exports = router;
//just c