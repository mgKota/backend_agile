const express = require('express');
const app = express();
const redis = require("redis");
const cors = require('cors');
const mongoose = require('mongoose');
//const mongo = require('./libs/mongodb');

// Security settings
const helmet = require('helmet');
app.use(helmet.frameguard('deny'));
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.ieNoOpen());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/status', (req, res) => {
    return res.status(200).end();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
    cors({
        origin: '*',
        allowMethods: ['GET','POST'],
        exposeHeaders: ['X-Request-Id']
    }));

// Db connection
//connectDb();

// Set up API routes
require('./api/router/api')(app);


async function connectDb() {
    return await mongoose.connect('mongodb://localhost/test-stored_images');
}

// Error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    return res.status(err.status);
});

module.exports = app;

