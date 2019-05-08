const express = require('./kexpress');
const fs = require('fs');
const path = require('path');

const app = express();
app.get('/', (req, res) => {
    console.log('aa');
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
});

app.get('/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify([{ name: 'jack', age: 20 }]));
});

app.listen(3001);
