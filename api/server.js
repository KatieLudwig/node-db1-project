const express = require("express");

const server = express();

server.use(express.json());

server.use('*', (req, res) => {
    res.status(400).json({
        message: 'not found'
    })
})

module.exports = server;
