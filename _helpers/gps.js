'use strict';

const gpsDistance = require('gps-distance');

const distance = (source, destination) => {
    const source_lat = parseFloat(source[0]);
    const source_lon = parseFloat(source[1]);
    const destination_lat = parseFloat(destination[0]);
    const destination_lon = parseFloat(destination[1]);
    return gpsDistance(source_lat, source_lon, destination_lat, destination_lon).toPrecision(4);
};

module.exports = {
    distance
};