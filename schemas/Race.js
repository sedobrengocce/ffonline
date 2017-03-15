"use strict";

const mongoose = require('mongoose');

const race = new mongoose.Schema({
    _id: String,
    positionals: {
       type: [{
           position: {
               type: String,
               required: true,
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