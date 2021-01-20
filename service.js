#!/usr/bin/env node

const app = require('./app');
const http = require('http');

const server = http.createServer(app);

const port_redis = process.env.PORT || 6379;
const port = process.env.PORT || normalizePort(5000);
const redis_client = redis.createClient(port_redis);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const _port = parseInt(val, 10);
    if (isNaN(_port)) {
        return val;
    }
    if (_port >= 0) {
        return _port;
    }

    return false;
}

function onError(error) {
    console.log(error);
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ', bind);
}
