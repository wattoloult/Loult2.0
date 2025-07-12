const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

let users = {};

io.on('connection', (socket) => {
  console.log('Nouvel utilisateur connecté');

  socket.on('new-user', (pseudo) => {
    users[socket.id] = pseudo;
    io.emit('update-users', Object.values(users));
  });

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('update-users', Object.values(users));
  });
});

http.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
