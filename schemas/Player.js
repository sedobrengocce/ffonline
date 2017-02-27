"use strict";

const mongoose = require('mongoose');

const player = new mongoose.Schema({
    position: {
        type: String,
        required: true,
        unique: true
    },
    mv: {
        type: Number,
        required: true
    },
    fo: {
        type: Number,
        required: true
    },
    ag: {
        type: Number,
        required: true
    },
    av: {
        type: Number,
        required: true
    },
    skill: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
        }]
    },
    normal: {
        type: [{
            type: String,
            enum: ['G', 'A', 'S', 'P', 'M']
        }],
        required: true
    },
    double: {
        type: [{
            type: String,
            enum: ['G', 'A', 'S', 'P', 'M']
        }],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});


module.exports = player;