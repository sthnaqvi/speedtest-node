'use strict';

const express = require('express');
const router = express.Router();
const ipService = require('./ip.service');

router.get('/', ipService.get);

module.exports = router;