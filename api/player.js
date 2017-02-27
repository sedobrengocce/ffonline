"use strict";

const express = require('express');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');

module.exports = function (wagner) {

    const api = express.Router();

    api.use(bodyParser.json());

    api.post('/player/add', wagner.invoke(function (Player) {
        return function (req, res) {
            let doc = {
                position: req.body.position,
                mv: req.body.mv,
                fo: req.body.fo,
                ag: req.body.ag,
                av: req.body.av,
                normal: req.body.normal,
                double: req.body.double,
                price: req.body.price
            };
            if(!!req.body.skill) {
                let skills = [];
                wagner.invoke(function (Skill) {
                    for(let s of req.body.skill) {
                        Skill.findOne({name: s}, function (err, skill) {
                            if (err) {
                                return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                                    .json({error: err.toString()});
                            }
                            if (!skill) {
                                return res.status(httpStatus.NOT_FOUND)
                                    .json({error: 'Skill Not Found'});
                            }
                            skills.push(skill._id);
                        })
                    }
                });
                doc.skill = skills;
            }
            //noinspection JSUnresolvedVariable
            Player.create(doc, function (err) {
                if(err){
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ error: err.toString() });
                }
                res.json({operation: 'success'});
            });
        }
    }));

    api.get('/player/:position', wagner.invoke(function(Player) {
        return function (req, res) {
            Player.findOne({ position: req.params.position }, function (err, player) {
                if(err){
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ error: err.toString() });
                }
                if(!player){
                    return res.status(httpStatus.NOT_FOUND)
                        .json({ error: 'Not Found' });
                }
                res.json({player : player});
            })
        }
    }));

    api.put('/player/:position/edit', wagner.invoke(function (Skill) {
        return function (req, res) {
            let doc = {
                position: req.body.position,
                mv: req.body.mv,
                fo: req.body.fo,
                ag: req.body.ag,
                av: req.body.av,
                normal: req.body.normal,
                double: req.body.double,
                price: req.body.price
            };
            if(!!req.body.skill) {
                let skills = [];
                wagner.invoke(function (Skill) {
                    for(let s of req.body.skill) {
                        Skill.findOne({name: s}, function (err, skill) {
                            if (err) {
                                return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                                    .json({error: err.toString()});
                            }
                            if (!skill) {
                                return res.status(httpStatus.NOT_FOUND)
                                    .json({error: 'Skill Not Found'});
                            }
                            skills.push(skill._id);
                        })
                    }
                });
                doc.skill = skills;
            }
            //noinspection JSUnresolvedVariable
            Skill.findOneAndUpdate({position: req.params.position}, doc, function (err) {
                if (err) {
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({error: err.toString()});
                }
                res.json({operation: 'success'});
            });
        }
    }));

    api.delete('/player/:position/delete', wagner.invoke(function (Skill) {
        return function (req, res) {
            Skill.remove({ position: req.params.position }, function (err) {
                if (err) {
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({error: err.toString()});
                }
                res.json({operation: 'success'});
            });
        }
    }));

    return api;
};
