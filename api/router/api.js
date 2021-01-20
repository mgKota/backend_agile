const express = require('express');
const routes = require('./routes');
const auth = require('../middlewares/auth');
middlewareAuth

function init(app) {
    app.use('/images', auth.validateAuth, routes);
    // catch 404
    app.use((req, res, next) => next(
        res.status(404).send({ code: '404', type: 'route_not_found'})
    ));
}

module.exports = init;