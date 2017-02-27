"use strict";

const express = require('express');
const router = express.Router();

/* GET home page. */
const admin = router.get('/', function(req, res, next) {
    res.render('admin', { title: 'FFOnline Manager' });
});

module.exports = admin;

