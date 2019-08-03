'use strict';

const express = require('express');
const router = express.Router();
const speedtestService = require('./speedtest.service');

router.get('/', speedtestService.get);

router.post('/', speedtestService.post);

router.get('/garbage', speedtestService.getGarbage);

module.exports = router;