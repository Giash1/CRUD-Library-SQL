const express = require('express');

const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");


const io = new Server(server);
app.use(express.static('public'));

const PORT = 3000;

server.listen(PORT, () => {
    console.log('Chat app - Listening on port*:' + PORT);
});

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html'); // send file
});

app.get('/chatt', (req, res) => {

  res.sendFile(__dirname + '/chatt.html');
});

app.get('/create', (req, res) => {

  res.sendFile(__dirname + '/create.html');
});

app.get('/search', (req, res) => {

  res.sendFile(__dirname + '/search.html');
});

app.get('/delete', (req, res) => {

  res.sendFile(__dirname + '/delete.html');
});

app.get('/update', (req, res) => {

  res.sendFile(__dirname + '/update.html');
});

// Read
app.get('/read', (req, res) => {

  res.sendFile(__dirname + '/read.html');
});

const mainRoom = "main room";
const waitingRoom = "waiting room";
let peopleInMainRoom = 0;

io.on('connection', (socket) => { //  I/O (input/output)

  peopleInMainRoom++; // increase the person in the main room by one

  if(peopleInMainRoom <= 2) { // If the total person in the main room is less than 2 or the equal

    socket.join(mainRoom);

    socket.emit('server message', 'Välkommen till chattrummet')

    console.log("People in main room: " + peopleInMainRoom);
  }
  else {
    socket.join(waitingRoom);
    socket.emit('server message', 'Välkommen till väntrummet ')
    socket.emit('server message', 'Du är placerad i kö...')
  }

  socket.on('disconnect', () => { // disconnect | SOCKET (finishing)
    console.log('A user disconnected');
    peopleInMainRoom--; // decrease the person by 1
  });

  socket.on('chat message', (message) => {

    io.to(mainRoom).emit('chat message', message); // send the matters to the main room
  })
});
