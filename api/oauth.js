"use strict";

const express = require('express');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');

const config = require('../config/config');

module.exports = function (wagner) {

    const api = express.Router();

    api.use(bodyParser.json());

    api.post('/oauth/login', wagner.invoke(function (User) {
        return function (req, res) {
            User.findOne({
                name: req.body.user
            }, function(err, user) {
                if (err) throw err;
                if (!user) {
                    res.send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                    // check if password matches
                    user.comparePassword(req.body.pass, function (err, isMatch) {
                        if (isMatch && !err) {
                            // if user is found and password is right create a token
                            const token = jwt.encode(user, config.secret);
                            // return the information including token as JSON
                            res.json({success: true, token: 'JWT ' + token});
                        } else {
                            res.send({success: false, msg: 'Authentication failed. Wrong user or password.'});
                        }
                    });
                }
            });
        }
    }));

    api.post('/oauth/signup', wagner.invoke(function (User){
        return function(req, res) {
            if (!req.body.user || !req.body.pass) {
                res.json({success: false, msg: 'Please pass name and password.'});
            } else {
                let newUser = new User({
                    user: req.body.name,
                    pass: req.body.password
                });
                // save the user
                newUser.save(function (err) {
                    if (err) {
                        return res.json({success: false, msg: 'Username already exists.'});
                    }
                    res.json({success: true, msg: 'Successful created new user.'});
                });
            }
        }
    }));

    return api;
};

