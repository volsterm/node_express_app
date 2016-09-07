var doRequest = require('request-promise-native'),
    config = require('../config/' + (process.env.NODE_ENV || 'development')),
    customError = require('./customError');

exports.send = (phone, text) => {
    var options = {
        uri: 'http://sms.ru/sms/send',
        method: 'GET',
        qs: {
            to: phone,
            text: text,
            api_id: config.sms.api_id,
            test: config.sms.test
        }
    };
    return doRequest(options)
        .then(result => {
            var responceCode = result.split('\n')[0];
            if(responceCode != '100')
                return Promise.reject(new customError(
                    `Ошибка отправки смс, код ошибки: ${responceCode}`));
            return Promise.resolve();
        })
};