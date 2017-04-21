"use strict";

const express = require('express');
const router = express.Router();

/* GET home page. */
const template = router.get('/:name', function(req, res, next) {
    res.render('template/'+ req.params.name);
});

module.exports = template;