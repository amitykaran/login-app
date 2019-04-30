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
        userModel.findOne({email: user.email})
        .exec((err, obj) => {
            if(err){
                console.log(err);
                res.send(`Error ${err}`);
            } else{
                if(!_.isEmpty(obj)){
                    console.log('User found', obj);
                if(user.password && obj.password){
                    bcrypt.compare(user.password, obj.password, (error, auth) => {
                        if(auth){
                            console.log('Congratulation! you are successfully loggedIn');
                            res.json({
                                status: 'success',
                                result : 'You are logged in successfully'
                            })
                        } else{
                            console.log('Your password is incorrect, Please try again');
                            res.status(403).json({
                                status: 'failed',
                                error: 'Incorrect password!'
                            });
               
                        }
                    });
                  
                } else {
                    console.log('Please provide a valid password');
                     }
                // res.json({
                //     status: 'success',
                //     user: obj
                // })
                } else{
                    console.log('User Not found');
                    res.send('User Not Found');
                }
            }
        })
    } else {
        res.send('Please enter a valid user');
    }
});

module.exports = router;