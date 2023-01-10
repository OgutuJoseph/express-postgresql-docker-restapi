const express = require('express');
const app = express();
require('dotenv').config();

/** .env variables  */
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server connected on port: ${port}`)
})

