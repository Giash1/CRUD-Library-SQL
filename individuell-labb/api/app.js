const express = require('express');
const app = express();
const cors = require('cors');

// Import the controller
const controller = require("../api/controllers/bookController");

// Define the route and associate it with the 'get' function
app.get("/books", controller.get);

const PORT = 3001;
app.use(cors());

app.use(express.urlencoded({extended: true}));

app.use(express.json());

const bookRouter = require('./routes/book');
app.use('/book', bookRouter);

app.listen(PORT, () => {
    console.log('Listening on port*:' + PORT);
});
