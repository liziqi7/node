const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
app.use(bodyParser.json());
let chatList = [];

app.get('/chat', (req, res) => {
//   res.end();
  fs.createReadStream(path.resolve('./12-chat.html')).pipe(res)
});

app.get('/list', (req, res) => {
  res.end(JSON.stringify(chatList));
});

app.post('/send', (req, res) => {
  chatList.push(req.body.message);
  res.end(JSON.stringify(chatList));
});

app.get('/clear', (req, res) => {
  chatList = [];
  res.end(JSON.stringify(chatList));
});
app.listen(3002);
