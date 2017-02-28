"use strict";

const wagner = require('wagner-core');
const express = require('express');
const assert = require('assert');
const superagent =  require('superagent');

const URL = 'http://127.0.0.1:7357';
const api = require('../api');

let app = express();

let models = require('../models')(wagner);

app.use(api.skill(wagner));

app.use(api.player(wagner));

app.use(api.oauth(wagner));

describe('API - Login', function () {
    let server;

    before(function (done) {
        server = app.listen(7357);
        done();
    });

    after( function(){
        server.close();
    });

    it('Wrong User Name', function (done) {
        const url = URL + '/oauth/login';
        superagent.post(url).send({user:'test'}).end(function (err, res) {
            assert.ifError(err);
            let result;
            assert.doesNotThrow(function () {
                result = JSON.parse(res.text);
            });
            //noinspection JSUnusedAssignment
            assert.ok(result);
            //noinspection JSUnusedAssignment
            assert.equal(result.success, false);
            //noinspection JSUnusedAssignment
            assert.equal(result.msg, 'Authentication failed. User not found.');
            done();
        })
    })
});

describe('API - Skill', function () {

    let server;
    let Skill;

    before(function (done) {

        server = app.listen(7357);

        Skill = models.Skill;
        Skill.remove({}, function (err) {
            assert.ifError(err);
        });
        done()
    });

    after(function () {
        server.close();
    });

    /*beforeEach(function (done) {
     Skill.remove({}, function (err) {
     assert.ifError(err);
     done();
     });
     });*/


    it('Create Skill', function (done) {
        const url = URL + '/skill/add';

        let doc = {
            name: 'myskill',
            description: 'this is a description'
        };
        //noinspection JSUnresolvedFunction
        superagent.post(url).send(doc).end(function (error, res) {
            assert.ifError(error);
            let result;
            assert.doesNotThrow(function () {
                result = JSON.parse(res.text);
            });
            //noinspection JSUnusedAssignment
            assert.ok(result);
            //noinspection JSUnusedAssignment
            assert.equal(result.operation, 'success');
            Skill.count({name: 'myskill'}, function (e, r) {
                assert.ifError(e);
                assert.equal(r,1)
            });
            done();
        })
    });

    it('Read Skill', function (done) {
        //Create a skill
        Skill.create({ name: 'block', description: 'The block skill'}, function (error) {
            assert.ifError(error);
            const url = URL + '/skill/block';
            //noinspection JSCheckFunctionSignatures
            superagent.get(url).end(function (err, res) {
                assert.ifError(err);
                let result;
                assert.doesNotThrow(function () {
                    result = JSON.parse(res.text);
                });
                //noinspection JSUnusedAssignment
                assert.ok(result.skill);
                //noinspection JSUnusedAssignment
                assert.equal(result.skill.name, 'block');
                Skill.count({name: 'block'}, function (e, r) {
                    assert.ifError(e);
                    assert.equal(r,1)
                });
                done();
            });
        });
    });

    it('Update Skill', function (done) {
        Skill.create({ name: 'dodge', description: 'The block skill'}, function (error) {
            assert.ifError(error);
            const url = URL + '/skill/dodge/edit';
            let doc = {
                name: 'myskill2',
                description: 'this is a description'
            };
            //noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
            superagent.put(url).send(doc).end(function (err, res) {
                assert.ifError(error);
                let result;
                assert.doesNotThrow(function () {
                    result = JSON.parse(res.text);
                });
                //noinspection JSUnusedAssignment
                assert.ok(result);
                //noinspection JSUnusedAssignment
                assert.equal(result.operation, 'success');
                Skill.count({name: 'myskill2'}, function (e, r) {
                    assert.ifError(e);
                    assert.equal(r,1)
                });
                done();
            });
        });
    });

    it('Delete Skill', function (done) {
        Skill.create({ name: 'guard', description: 'The guard skill'}, function (error) {
            assert.ifError(error);
            Skill.count({name: 'guard'}, function (e, r) {
                assert.ifError(e);
                assert.equal(r,1)
            });
            const url = URL + '/skill/guard/delete';
            //noinspection JSCheckFunctionSignatures,JSUnresolvedFunction
            superagent.del(url).end(function (err, res) {
                assert.ifError(err);
                let result;
                assert.doesNotThrow(function () {
                    result = JSON.parse(res.text);
                });
                //noinspection JSUnusedAssignment
                assert.ok(result);
                //noinspection JSUnusedAssignment
                assert.equal(result.operation, 'success');
                Skill.count({name: 'guard'}, function (e, r) {
                    assert.ifError(e);
                    assert.equal(r,0)
                });
                done();
            });
        });
    });

});

describe('API - Player', function () {

    let server;
    let Player;

    before(function (done) {
        server = app.listen(7357);
        Player = models.Player;
        Player.remove({}, function (err) {
            assert.ifError(err);
        });
        done()
    });

    after(function () {
        server.close();
    });

    it('Create Player', function (done) {
        const url = URL + '/player/add';

        let doc = {
            position: 'test-create',
            mv: 1,
            fo: 2,
            ag: 3,
            av: 4,
            normal: ['G','A'],
            double: ['S','P'],
            skill: ['block'],
            price: 10
        };
        //noinspection JSUnresolvedFunction
        superagent.post(url).send(doc).end(function (error, res) {
            assert.ifError(error);
            let result;
            assert.doesNotThrow(function () {
                result = JSON.parse(res.text);
            });
            //noinspection JSUnusedAssignment
            assert.ok(result);
            //noinspection JSUnusedAssignment
            assert.equal(result.operation, 'success');
            Player.count({position: 'test-create'}, function (e, r) {
                assert.ifError(e);
                assert.equal(r,1)
            });
            done();
        })
    });

    it('Read Player', function (done) {
        //Create a player
        let doc = {
            position: 'test-read',
            mv: 1,
            fo: 2,
            ag: 3,
            av: 4,
            normal: ['G','A'],
            double: ['S','P'],
            //skill: ['block'],
            price: 10
        };
        Player.create(doc, function (error) {
            assert.ifError(error);
            const url = URL + '/player/test-read';
            //noinspection JSCheckFunctionSignatures
            superagent.get(url).end(function (err, res) {
                assert.ifError(err);
                let result;
                assert.doesNotThrow(function () {
                    result = JSON.parse(res.text);
                });
                //noinspection JSUnusedAssignment
                assert.ok(result.player);
                //noinspection JSUnusedAssignment
                assert.equal(result.player.position, 'test-read');
                Player.count({position: 'test-read'}, function (e, r) {
                    assert.ifError(e);
                    assert.equal(r,1)
                });
                done();
            });
        });
    });
});