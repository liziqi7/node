const net = require('net');
const chatServer = net.createServer(),
  clientList = [];
chatServer.on('connection', function(client) {
  client.write('Hi!\n');
  clientList.push(client);
  client.on('data', function(data) {
    clientList.forEach(function(v) {
      if (v != client) {
        v.write(data);
      }
    });
  });
});
chatServer.listen(9000);
