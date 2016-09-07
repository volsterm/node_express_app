var express = require('express'),
    router = express.Router(),
    smsCode = require('../repo/smsCodeRepository'),
    sms = require('../libs/smsLib');

router.post('/sms', (req, res, next) =>
    smsCode
        .add(req.body.phone)
        .then(code  => sms.send(req.body.phone, code))
        .then(() => res.end())
        .catch(err => next(err)));

module.exports = router;