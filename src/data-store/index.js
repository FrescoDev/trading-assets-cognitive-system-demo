const NodeCache = require("node-cache");
const myCache = new NodeCache();
const assets = require('./asset-symbols.json');

myCache.set('asset_collection', assets);

module.exports = myCache;