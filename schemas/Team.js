"use strict";

const mongoose = require('mongoose');

const team = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coach: {
        type: String,
        required: true,
        ref: 'Coach'
    },
    race: {
        type: String,
        required: true,
        ref: 'Race'
    },
    rerolls: {
        type: Number,
        default: 0,
        required: true
    },
    apothecary: {
        type: Boolean,
        required: true
    },
    FF: {
        type: Number,
        default: 0,
        required: true
    },
    cheerleader: {
        type: Number,
        default: 0,
        required: true
    },
    assistant: {
        type: Number,
        default: 0,
        required: true
    },
    treasure: {
        type: Number,
        default: 0,
        required: true
    },
    logo: String,
    player:{
        type :[{
            name:{
                type: String,
                required: true
            },
            player: {
                ref: 'players',
                type: String,
                required: true
            },
            spp: {
                type: Number,
                default: 0,
                required: true
            },
            skill: {
                type: [{
                    ref: 'skills',
                    type: String
                }]
            },
            mv: [{type:Number}],
            fo: [{type:Number}],
            ag: [{type:Number}],
            av: [{type:Number}],
            status: {
                type: String,
                enum: ['ready', 'mng', 'killed', 'retired'],
                required: true,
                default: 'ready'
            }
        }],
        validate: [arraylimit, '{PATH} exceedes limits']
    }
});

function arraylimit(val) {
    return (val.length <17 && val.length >10);
}

module.exports = team;