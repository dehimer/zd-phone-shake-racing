const express = require('express');
const request = require('request');
const socketIO = require('socket.io');
const http = require('http');
const Emitter = require('events');
const can = new Emitter();
const uuidv1 = require('uuid/v1');


const config = require('../../config');
let { persons } = config;

// HTTP
const port = config.port || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.static('dist'));
app.use(express.static('public'));

server.listen(port, () => {
  console.log(`Server is ran on : http://localhost:${port}`);
});


/*
[socket.id]: {
  id
  socket

}
*/
const players = {};



// SOCKETIO
const io = socketIO();
io.attach(server);

io.on('connection', (socket) => {
  can.emit('persons:sync');

  socket.on('disconnect', () => {
    can.emit('person:unselect', socket)
  });

  socket.on('action', (action) => {
    const { type, data } = action;
    console.log(action);
    switch (type) {
      case 'server/selectperson':
        can.emit('person:select', socket, data);
        break;
      case 'server/shake':
        can.emit('shake', data);
        break;
      default: console.log(`Unknown action ${type}`);
    }
  });
});

can.on('persons:sync', (socket=io) => {
  socket.emit('action', { type: 'server/persons', data: persons.filter(person => !person.userId) });
});

can.on('person:selected', (socket) => {
  socket.emit('action', { type: 'server/selectedperson', data: persons.find(person => socket.id === person.userId) });
});

can.on('person:select', (socket, personId) => {
  persons = persons.map((person) => {
    if (person.id === personId) {
      person.userId = socket.id;
    }
    return person;
  });

  can.emit('persons:sync');
  can.emit('person:selected', socket)
});

can.on('person:unselect', (socket) => {
  persons = persons.map((person) => {
    if (person.userId === socket.id) {
      delete person.userId;
    }
    return person;
  });

  can.emit('persons:sync');
  can.emit('person:selected', socket)
});


can.on('shake', (data) => {
  console.log('shake');
});
