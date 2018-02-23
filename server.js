'use strict';

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

var root = path.resolve(process.argv[2] || '.');
console.log('root:' + root);
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('pathname:' + pathname);
    var filePath = path.join(root, pathname)
    console.log('filePath:' + filePath);
    fs.stat(filePath, function (err, stat) {
        if (!err && stat.isFile()) {
            console.log('200:' + request.url)
            response.writeHead(200);
            var rs = fs.createReadStream(filePath);
            rs.pipe(response);

        } else {
            console.log('404');
            response.writeHead(404);
            response.end('404 Not Found')
        }
    })
})

server.listen(8888);

console.log('server run at http:127.0.0.1:8888/')

