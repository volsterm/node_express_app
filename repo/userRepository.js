var mysql = require('../libs/dbs').mysql;

exports.checkCustomerAbsence = phone =>
    mysql.query('CALL checkCustomerAbsenceByPhone(?)', [phone]);

exports.checkSellerAbsence = phone =>
    mysql.query('CALL checkSellerAbsenceByPhone(?)', [phone]);

exports.register = (body, role) =>
    mysql.query('CALL register(?,?,?,?)', [body.phone, body.name, body.password, role]);