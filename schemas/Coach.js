"use strict";

const mongoose = require('mongoose');

const coach = new mongoose.Schema({
    nickname: {
        type: String,
        reqiured: true
    },
    nafid: Number,
    nafnick: String,
    teams: [{
        type: String,
        ref: 'Team'
    }]
});

module.exports = coach;