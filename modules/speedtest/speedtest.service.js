'use strict';

const NodeCache = require("node-cache");
const nodeCache = new NodeCache();
const randomBytes = require('random-bytes');

const get = (req, res) => {
    res.sendStatus(200);
};

const post = (req, res) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.set("Cache-Control", "post-check=0, pre-check=0");
    res.set("Pragma", "no-cache");
    res.sendStatus(200);
};

const _getRandomBytesFromCache = async () => {
    let bytes = nodeCache.get('randomBytes');
    if (!bytes) {
        const byteSize = 1048576; // 1mb
        bytes = await randomBytes(byteSize);
        nodeCache.set('randomBytes', bytes);
    };
    return bytes;
};

const getGarbage = async (req, res) => {
    const requestedSize = (req.query.ckSize || 100);
    const data = await _getRandomBytesFromCache();

    res.set('Content-Description', 'File Transfer');
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', 'attachment; filename=random.dat');
    res.set('Content-Transfer-Encoding', 'binary');
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.set('Cache-Control', 'post-check=0, pre-check=0', false);
    res.set('Pragma', 'no-cache');

    for (let i = 0; i < requestedSize; i++) {
        res.write(data);
    };
    res.end();
};

module.exports = {
    get,
    post,
    getGarbage
};