var express = require('express'),
    router = express.Router(),
    smsCode = require('../repo/smsCodeRepository'),
    user = require('../repo/userRepository'),
    sms = require('../libs/smsLib'),
    customError = require('../libs/customError');

router.post('/', (req, res, next) =>
    smsCode.get(req.body.phone)
        .then(result => {
            if(!result)
                return Promise.reject(new customError('Код просрочен', 400));
            if(result.code != req.body.code)
                return Promise.reject(new customError('Неверный код', 400));
            return user.register(req.body, 'customer');
        })
        .then(() => smsCode.remove(req.body.phone))
        .then(() => res.end())
        .catch(err => next(err)));

router.post('/sms', (req, res, next) =>
    user.checkCustomerAbsence(req.body.phone)
        .then(() => smsCode.add(req.body.phone))
        .then(code  => sms.send(req.body.phone, code))
        .then(() => res.end())
        .catch(err => next(err)));

module.exports = router;