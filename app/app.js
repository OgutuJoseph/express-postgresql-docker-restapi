const express = require('express');
const app = express();
require('dotenv').config();

/** .env variables  */
// const port = process.env.PORT;
const port = 5002;

/** middlewares */
app.use(express.urlencoded({ extended: false })) // to see bodies; not to have complicated bodies***
app.use(express.json())

app.listen(port, () => {
    console.log(`Server connected on port: ${port}`)
})

module.exports = app;