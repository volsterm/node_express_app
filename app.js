var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    redisStore = require('connect-redis')(session),
    dbs = require('./libs/dbs'),
    config = require('./config/' + (process.env.NODE_ENV || 'development')),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('./repo/userRepository');

var customer = require('./routes/customer'),
    seller = require('./routes/seller'),
    logout = require('./routes/logout');

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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((userIdAndRoleId, done) => done(null, userIdAndRoleId));

passport.deserializeUser((userIdAndRoleId, done) =>
    User.getByIdAndRole(userIdAndRoleId)
        .then(user => done(null, user))
        .catch(err => done(err)));

passport.use('local', new localStrategy({
        usernameField: 'phone',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, phone, password, done) =>
        User.login(req.body)
            .then(userIdAndRoleId => done(null, userIdAndRoleId))
            .catch(err => done(err))
));

app.use('/customer', customer);
app.use('/seller', seller);
app.use('/logout', logout);

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
