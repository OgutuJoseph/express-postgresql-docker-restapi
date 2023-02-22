const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// configs
const port = process.env.PORT || 5002;

/** Middlewares */
// to see bodies of requests that come
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Routers */

/** Routes */
app.listen(port, () => {
    console.log(`Server has started on port: ${port}`)
});

module.exports = app;