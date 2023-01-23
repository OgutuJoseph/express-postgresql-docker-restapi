const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

/** middlewares */
app.use(express.json());

/** routes */

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server has started on port: ${port}`)
})