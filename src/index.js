const express = require('express');
const routes = require('./routes')
const {logRequest} = require('./middlewares');

const server = express();

server.use(express.json());

server.use(logRequest);

server.use(routes);

server.listen(3000);