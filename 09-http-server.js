const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer((req, res) => {
    const { url, method } = req;
    if (url === '/' && method === 'GET') {
      fs.readFile(path.resolve('./09.html'), (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('500 Internal Server Error!');
          return false;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      });
    } else if (url === '/users' && method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify([{ name: 'jack', age: 20 }]));
    } 
  })
  .listen(3000);
