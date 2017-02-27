"use strict";

const express = require('express');
const router = express.Router();

/* GET home page. */
const index = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = index;
