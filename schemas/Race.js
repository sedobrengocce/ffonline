"use strict";

const mongoose = require('mongoose');

const race = new mongoose.Schema({
    _id: String,
    positionals: {
       type: [{
           type: String,
           ref: 'Player'
       }],
       max: Number
    },
    apothecary:{
        type: Boolean
    },
    reroll: Number,
    starplayers: {
        type: [{
            type: String,
            ref: 'Player'
        }]
    }
});

module.exports = race;