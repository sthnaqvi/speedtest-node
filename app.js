'use strict';

const express = require('express');
const path = require('path');
const app = express();
const errorHandler = require('./_helpers/error-handler');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/speedtest', require('./modules/speedtest/speedtest.controller'));
app.use('/v1/ip', require('./modules/ip/ip.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 9000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});