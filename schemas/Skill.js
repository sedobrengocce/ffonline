"use strict";

const mongoose = require('mongoose');

const skill = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String
});

module.exports = skill;