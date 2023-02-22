const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// configs
const port = process.env.PORT || 5002;

/** Middlewares */

/** Routers */

/** Routes */
app.listen(port, () => {
    console.log(`Server has started on port: ${port}`)
});

module.exports = app;