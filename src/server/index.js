const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const Emitter = require('events');
const can = new Emitter();


const config = require('../../config');
let { persons } = config;

// HTTP
const port = config.port || 3000;
const app = express();
const server = http.createServer(app);


app.use(express.static('dist'));
app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')));
app.get('/*', function(req, res, next) {
  // res.sendFile(express.static(path.join(__dirname, '..', '..', 'dist', 'index.html')));
  res.sendFile(path.join(__dirname + '/../../dist/index.html'));
});


server.listen(port, () => {
  console.log(`Server is ran on : http://localhost:${port}`);
});

// SOCKETIO
const io = socketIO();
io.attach(server);
const webmobileIO = io.of('/webmobile');
const unityIO = io.of('/unity');
const emulatorIO = io.of('/emulator');


emulatorIO.on('connection', (socket) => {
  console.log('connection emulatorIO');
  can.emit('persons', socket);
});

unityIO.on('connection', (socket) => {
  can.emit('persons', socket);
});

const addessSocketMap = {};
const socketPersonMap = {};

webmobileIO.on('connection', (socket) => {
  const { address } = socket.handshake;
  console.log(`Connection from ${address}`);
  can.emit('person:unselected', socket);

  if (addessSocketMap[address]) {
    console.log(`Client ${address} is already connected. Disconnect oldest.`);
    addessSocketMap[address].emit('stop');
  }

  addessSocketMap[address] = socket;

  can.emit('persons:sync', socket);

  socket.on('disconnect', () => {
    delete addessSocketMap[address];
    can.emit('person:unselect', socket)
  });

  socket.on('action', (action) => {
    const { type, data } = action;

    switch (type) {
      case 'server/selectperson':
        can.emit('person:select', socket, data);
        break;
      case 'server/shake':
        can.emit('shake', data, socket);
        break;
    }
  });
});

can.on('persons:sync', (socket=io) => {
  socket.emit('action', {
    type: 'server/persons', data: persons.filter(person => !person.userId)
  });
});

can.on('person:selected', (socket) => {
  socket.emit('action', { type: 'server/selectedperson', data: persons.find(person => socket.id === person.userId) });
});

can.on('person:unselected', (socket) => {
  socket.emit('action', { type: 'server/unselectedperson' });
});

can.on('person:select', (socket, personId) => {
  console.log('person:select');

  socketPersonMap[socket.id] = personId;

  persons = persons.map((person) => {
    if (person.id === personId) {
      console.log(person);
      person.userId = socket.id;
    }
    return person;
  });

  can.emit('persons:sync', webmobileIO);
  can.emit('persons', unityIO);
  can.emit('persons', emulatorIO);
  can.emit('person:selected', socket)
});

can.on('person:unselect', (socket) => {
  console.log('person:unselect');

  delete socketPersonMap[socket.id];

  persons = persons.map((person) => {
    if (person.userId === socket.id) {
      console.log(person);
      delete person.userId;
    }
    return person;
  });

  can.emit('persons:sync', webmobileIO);
  can.emit('persons', unityIO);
  can.emit('persons', emulatorIO);
  can.emit('person:unselected', socket)
});

const shakeTimeouts = {};

can.on('shake', (data, socket) => {
  if (shakeTimeouts[socket.id]) {
    clearTimeout(shakeTimeouts[socket.id]);
  }

  // семь раз отмерь
  shakeTimeouts[socket.id] = setTimeout(() => {
    // один раз отрежь
    delete shakeTimeouts[socket.id];
    can.emit('person:unselect', socket);
  }, 700);


  if (socketPersonMap[socket.id]) {
    console.log(data);
    unityIO.emit('shake', data);
    emulatorIO.emit('shake', data);
  }
});


can.on('persons', (socket) => {
  socket.emit('persons', persons);
});
