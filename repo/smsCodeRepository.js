var smsCode = require('../models/smsCodeModel');

exports.add = phone => smsCode.create({phone: phone}).then(result => result.code);
exports.get = phone => smsCode.findOne({phone: phone});
exports.remove = phone => smsCode.remove({phone: phone});