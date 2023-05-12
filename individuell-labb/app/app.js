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

    res.sendFile(__dirname + '/index.html'); // SKICKA fil
});

app.get('/chatt', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/chatt.html'); // SKICKA fil
});

app.get('/create', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/create.html'); // SKICKA fil
});

app.get('/search', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/search.html'); // SKICKA fil
});

app.get('/delete', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/delete.html'); // SKICKA fil
});

app.get('/update', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/update.html'); // SKICKA fil
});

// Read
app.get('/read', (req, res) => { // HANTERA GET-request

  res.sendFile(__dirname + '/read.html'); // SKICKA fil
});

const mainRoom = "main room";
const waitingRoom = "waiting room";
let peopleInMainRoom = 0;

io.on('connection', (socket) => { // PÅ händelsen connection | NIVÅ: I/O (input/output)

  peopleInMainRoom++; // ÖKA antalet personer i main room med 1

  if(peopleInMainRoom <= 2) { // OM antalet personer i main room är mindre eller lika med 2, gör följande

    socket.join(mainRoom);

    socket.emit('server message', 'Välkommen till chattrummet')

    console.log("People in main room: " + peopleInMainRoom);
  }
  else { // ANNARS, gör följande
    socket.join(waitingRoom);
    socket.emit('server message', 'Välkommen till väntrummet ')
    socket.emit('server message', 'Du är placerad i kö...')
  }

  socket.on('disconnect', () => { // PÅ händelsen disconnect | NIVÅ: SOCKET (anslutning)
    console.log('A user disconnected');
    peopleInMainRoom--; // MINSKA antalet personer i main room med 1
  });

  socket.on('chat message', (message) => {

    io.to(mainRoom).emit('chat message', message); // YTTRA (skicka) händelsen chat message till main room
  })
});
