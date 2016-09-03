var mysqlPromise = require('mysql-promise')(),
    mongoose = require('mongoose'),
    Redis = require('promise-redis')(),
    config = require('../config/' + (process.env.NODE_ENV || 'development'));

mysqlPromise.configure(config.db.mysql);
var redis = Redis.createClient(config.redis.port, config.redis.host);

mongoose.Promise = Promise;                 // [1]

function checkMySQLConnection(){            // [2]
    return mysqlPromise.query('SELECT 1');
}

function checkRedisReadyState() {           // [3]
    return new Promise((resolve,reject) => {
        redis.once("ready", () => {redis.removeAllListeners('error'); resolve()});
        redis.once('error', e => reject(e));
    })
}

function init() {                           // [4]
    return Promise.all([
        checkMySQLConnection(),
        new Promise((resolve,reject) => {mongoose.connect(config.db.mongo, err =>
            err ? reject(err):resolve())}),
        checkRedisReadyState()
    ]);
}

module.exports = {                          // [5]
    mysql: mysqlPromise,
    redis: redis,
    init:  init
};