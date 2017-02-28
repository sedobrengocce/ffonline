'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
const user = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    oauth:{
        type: {
            token: String,
            facebook: String,
            twitter: String,
            google: String,
        }
    },
    role: {
        type: String,
        enum: ['ff_admin', 'user']
    }
});

user.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

user.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = user;
