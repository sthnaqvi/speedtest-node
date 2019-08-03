'use strict';

const request = require('request-promise');
const gpsHelper = require('../../_helpers/gps');

const get = async (req, res) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.headers['HTTP_CLIENT_IP'] || req.headers['X-Real-IP'] || req.headers['HTTP_X_FORWARDED_FOR'] || req.ip || req.ips[0];
    if (ip.substr(0, 7) === "::ffff:") {
        ip = ip.substr(7)
    };

    let ipData, serverData;
    try {
        ipData = await request(`https://ipinfo.io/${ip}/json`);
    } catch (error) {
        return res.send(ip);
    };

    ipData = JSON.parse(ipData);
    ipData.org = ipData.org ? ipData.org.replace(/[.,](\s+)?$/, '') + ', ' : '';
    ipData.city = ipData.city ? ipData.city + ', ' : '';
    ipData.region = ipData.region ? ipData.region + ', ' : '';
    ipData.country = ipData.country ? ipData.country + ', ' : '';
    const ipLocation = `${ipData.city}${ipData.region}${ipData.country}`;

    let result = `${ip} - ${ipData.org}${ipLocation}`;

    try {
        serverData = await request('https://ipinfo.io/json');
    } catch (error) {
        return res.send(result);
    };

    serverData = JSON.parse(serverData);
    if (ipData.loc && serverData.loc) {
        const ipLatLon = ipData.loc.split(',');
        const serverLatLon = serverData.loc.split(',');
        const distance = gpsHelper.distance(ipLatLon, serverLatLon);
        result += ` (${distance}km)`;
    };
    serverData.org = serverData.org ? serverData.org.replace(/[.,](\s+)?$/, '') + ', ' : '';
    serverData.city = serverData.city ? serverData.city + ', ' : '';
    serverData.region = serverData.region ? serverData.region + ', ' : '';
    serverData.country = serverData.country ? serverData.country + ', ' : '';

    const serverLocation = `${serverData.city}${serverData.region}${serverData.country}`;
    result += `</br> Server - ${serverData.ip} - ${serverData.org}${serverLocation}`;
    return res.send(result);
};

module.exports = {
    get
}