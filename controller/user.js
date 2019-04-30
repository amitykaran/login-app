const express = require('express');
const _ = require('lodash');
const bcrypt  = require('bcrypt');


const router = express.Router() ;
const userModel = require('../models/user');
var BCRYPT_SALT_ROUNDS = 12;

router.post('/add-user', (req, res) => {
    let user = {};
    if(req.body.user) {
        user = req.body.user;

    }
    console.log('req received is ', req.body);
    if(!_.isEmpty(user) && user.email && user.password) {
        userModel.findOne({email: user.email})
        .exec((err, obj) => {
            if(err){
                res.send('Error in finding user');
            } else{
                if(!_.isEmpty(obj)){
                    console.log('This email is already registered!');
                res.send('This email is alredy registered. Please SignUp with another ID');
   
                } else{
                    if(!_.isEmpty(user.password)) {
                        bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
                            user.password = hashedPassword;
                            let newUser = new userModel(user);
                            newUser.save((err, object) => {
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log(`${object} saved successfully`);
                                }
                            });
                        }).then(() => {
                            res.send('User created successfully');
                        }).catch((err) => {
                            console.log('Error in creating user. Please try again', err);
                            res.send(err);
                        });
                        console.log(`${user.name} received`);
                    } else{
                        console.log('Please provide a valid password');
                        res.send('Please provide a valid password');
                    }
                }
                         }
        });
    }  else {
        console.log('Please enter a valid user');
        res.send('Please enter a valid user');
    }
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

router.post('/change-password', (req, res) => {
    let user = {};
    if(req.body.user) {
        user = req.body.user;

    }
    console.log('req received is ', req.body);
    if(!_.isEmpty(user)) {
        userModel.findOne({email: user.email})
        .exec((err, obj) => {
            if(err){
                res.send('Error in finding user');
            } else{
                if(!_.isEmpty(obj)){
                    if(!_.isEmpty(user.password)) {
                        bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
                            obj.password = hashedPassword;
                            // let newUser = new userModel(user);
                            obj.save((err, object) => {
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log(`Password ${object} updated successfully`);
                                }
                            });
                        }).then(() => {
                            res.send('Password updated successfully');
                        }).catch((err) => {
                            console.log('Error in updating password. Please try again', err);
                            res.send(err);
                        });
                        console.log(`${user.name} received`);
                    } else {
                        console.log('Provide a valid password!');
                        res.send('Provide a valid password!');
                    }
                
                } else{
                    console.log('This email is not registered!');
                    res.send('This email is not registered. Please try with another ID');    
                }
                         }
        });
    }  else {
        console.log('User NOT found');
        res.send('Please enter a valid user');
    }
});

module.exports = router;
//just c