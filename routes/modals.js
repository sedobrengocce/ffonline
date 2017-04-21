"use strict";

const express = require('express');
const router = express.Router();

/* GET home page. */
const modals = router.get('/:name', function(req, res, next) {
    res.render('modals/'+ req.params.name);
});

module.exports = modals;
