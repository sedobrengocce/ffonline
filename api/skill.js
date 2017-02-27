"use strict";

const express = require('express');
const httpStatus = require('http-status');
const bodyParser = require('body-parser');

module.exports = function (wagner) {

    const api = express.Router();

    api.use(bodyParser.json());

    api.post('/skill/add', wagner.invoke(function (Skill) {
        return function (req, res) {
            //noinspection JSUnresolvedVariable
            Skill.create({ name: req.body.name, description: req.body.description}, function (err) {
                if(err){
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ error: err.toString() });
                }
                res.json({operation: 'success'});
            });
        }

    }));

    api.get('/skill/:name', wagner.invoke(function(Skill) {
        return function (req, res) {
            Skill.findOne({ name: req.params.name }, function (err, skill) {
                if(err){
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ error: err.toString() });
                }
                if(!skill){
                    return res.status(httpStatus.NOT_FOUND)
                        .json({ error: 'Not Found' });
                }
                res.json({skill : skill});
            })
        }
    }));

    api.put('/skill/:name/edit', wagner.invoke(function (Skill) {
        return function (req, res) {
            //noinspection JSUnresolvedVariable
            Skill.findOneAndUpdate({name: req.params.name}, {name: req.body.name, description: req.body.description}, function (err) {
                if (err) {
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({error: err.toString()});
                }
                res.json({operation: 'success'});
            });
        }
    }));

    api.delete('/skill/:name/delete', wagner.invoke(function (Skill) {
        return function (req, res) {
            Skill.remove({ name: req.params.name }, function (err) {
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
