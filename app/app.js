const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bookRouter = require('./routes/book')

/** middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** routes */
app.use('/book', bookRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server has started on port: ${port}`)
});

module.exports = app;