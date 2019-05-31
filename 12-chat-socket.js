const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
app.use(bodyParser.json());

let chatList = ['a'];

io.on('connection', socket => {
  console.log('io connection');
  socket.on('chat', msg => {
    console.log('msg:', msg);
    chatList.push(msg);
    // 广播给所有人
    io.emit('chat', chatList);

    // 广播给除了发送者外所有人
    // socket.broadcast.emit('chat', chatList);
  });
  socket.on('clear', msg => {
    chatList = [];
    io.emit('chat', chatList);
  });

  socket.on('disconnect',function(){
      console.log('user disconnect');
  })
});

app.get('/chat', (req, res) => {
  fs.createReadStream(path.resolve('./12-chat.html')).pipe(res);
});

app.get('/list', (req, res) => {
  res.end(JSON.stringify(chatList));
});

app.post('/send', (req, res) => {
  chatList.push(req.body.message);
  io.emit('chat', chatList);
  res.end(JSON.stringify(chatList));
});

app.get('/clear', (req, res) => {
  chatList = [];
  io.emit('chat', chatList);
  res.end(JSON.stringify(chatList));
});

http.listen(3004);
