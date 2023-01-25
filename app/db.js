const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.HOST
});

client.connect();
client.query('select now()').then(
    res => console.log('Connected to the db ' + res.rows[0].now)
);

module.exports = client;