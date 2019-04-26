const express = require('express');
const _  = require('lodash');

const router = express.Router();
const userModel = require('../models/user');

router.post('/login', (req, res) => {
    let user = {};
    if(!_.isEmpty(req.body.user)){
        user = req.body.user;
    }
    if(!_.isEmpty(user)){
        userModel.find({})
        .select({email: user.email})
        .exec((err, obj) => {
            if(err){
                console.log(err);
                res.send(`Error ${err}`);
            } else{
                console.log('User found', obj);
                res.json({
                    status: 'success',
                    user: obj
                })
            }
        })
    }
});

module.exports = router;