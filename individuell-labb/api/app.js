const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3001;
app.use(cors());

app.use(express.urlencoded({extended: true}));

app.use(express.json());

const bookRouter = require('./routes/book');
app.use('/book', bookRouter);

app.listen(PORT, () => { // LYSSNA på port
    console.log('API - Listening on port*:' + PORT);
});
