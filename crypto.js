'use strict';
var crypto=require('crypto');

var hash=crypto.createHash('sha1');

hash.update('nodejs');

console.log(hash.digest('hex'));



var hmac=crypto.createHmac('sha256','key');

hmac.update('nodejs');

console.log(hmac.digest('hex'))