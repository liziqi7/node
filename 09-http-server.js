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
    } else if (url === '/users' && (method === 'GET' || method === 'POST')) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      // 简单请求cors
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      res.end(JSON.stringify([{ name: 'jack', age: 20 }]));
    } else if (url === '/users' && method === 'OPTIONS') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Token,Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,PUT',
        'Access-Control-Allow-Credentials': 'true'
      });
      res.end();
    }
  })
  .listen(3000);
