"use strict";

const mongoose = require('mongoose');
const schema = require('./schemas');
const _ = require('underscore');

module.exports = function (wagner,dbname) {


    mongoose.connect('mongodb://127.0.0.1:27017/'+ dbname);

    //mongoose.connect('mongodb://ffonlineadmin:ffpassword@ds145359.mlab.com:45359/ffonline');

    const skill = mongoose.model('skill', schema.skill);
    const player = mongoose.model('player', schema.player);
    const coach = mongoose.model('coach', schema.coach);
    const race = mongoose.model('race', schema.race);
    const team = mongoose.model('team', schema.team);
    const user = mongoose.model('user', schema.user);

    const models = {
        Skill: skill,
        Player: player,
        Coach: coach,
        Race: race,
        Team: team,
        User: user
    };

    //noinspection JSCheckFunctionSignatures
    _.each(models, function(value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });

    return models;
};
