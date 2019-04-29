const express = require('express');
const _  = require('lodash');
const bcrypt = require('bcrypt');

const router = express.Router();
const userModel = require('../models/user');

router.post('/login', (req, res) => {
    let user = {};
    if(!_.isEmpty(req.body.user)){
        user = req.body.user;
    }
    if(!_.isEmpty(user)){
        userModel.find({email: user.email})
        .exec((err, obj) => {
            if(err){
                console.log(err);
                res.send(`Error ${err}`);
            } else{
                console.log('User found', obj);
                if(bcrypt.compare(user.password, obj.password)){
                    console.log('Congratulation! you are successfully loggedIn');
                    res.json({
                        status: 'success',
                        result : 'You are logged in successfully'
                    })
                } else {
                    console.log('Your password is incorrect, Please try again');
                    res.status(403).send();
                }
                // res.json({
                //     status: 'success',
                //     user: obj
                // })
            }
        })
    } else {
        res.send('Please enter a valid user');
    }
});

module.exports = router;