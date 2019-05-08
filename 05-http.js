const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer((req, res) => {
    const { url, method } = req;
    console.log('来了一个请求！');
    console.log(path.resolve('./index.html'));
    if (url === '/' && method === 'GET') {
      fs.readFile(path.resolve('./index.html'), (err, data) => {
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
    } else if (req.headers.accept.indexOf('image/*') !== -1 && method === 'GET') {
      console.log(path.resolve('.' + url));
      fs.createReadStream(path.resolve('.' + url)).pipe(res);
    }
  })
  .listen(3000);
