var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    redisStore = require('connect-redis')(session),
    dbs = require('./libs/dbs'),
    config = require('./config/' + (process.env.NODE_ENV || 'development'));

var customer = require('./routes/customer'),
    seller = require('./routes/seller');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: config.sessionSecret,
    store: new redisStore({client: dbs.redis}),
    saveUninitialized: false,
    resave: false
}));

app.use('/customer', customer);
app.use('/seller', seller);

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        console.error(err);
        res.json(err);
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err.message);
    res.json({error: err.message});
});

module.exports = app;
