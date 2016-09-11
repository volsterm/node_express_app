var express = require('express'),
    router = express.Router(),
    smsCode = require('../repo/smsCodeRepository'),
    user = require('../repo/userRepository'),
    sms = require('../libs/smsLib'),
    customError = require('../libs/customError'),
    passport = require('passport');

router.post('/', (req, res, next) =>
    smsCode.get(req.body.phone)
        .then(result => {
            if(!result)
                return Promise.reject(new customError('Код просрочен', 400));
            if(result.code != req.body.code)
                return Promise.reject(new customError('Неверный код', 400));
            return user.register(req.body, 'seller');
        })
        .then(() => smsCode.remove(req.body.phone))
        .then(() => res.end())
        .catch(err => next(err)));

router.post('/sms', (req, res, next) =>
    user.checkSellerAbsence(req.body.phone)
        .then(() => smsCode.add(req.body.phone))
        .then(code  => sms.send(req.body.phone, code))
        .then(() => res.end())
        .catch(err => next(err)));

router.post('/login', (req, res, next) =>
    {req.body.role = 'seller'; next()},
    passport.authenticate('local'),
    (req, res) => res.end());

module.exports = router;