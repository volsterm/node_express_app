var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json(err).end();
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({error: err.message}).end();
});

module.exports = app;
