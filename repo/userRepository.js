var mysql = require('../libs/dbs').mysql;

exports.checkCustomerAbsence = phone =>
    mysql.query('CALL checkCustomerAbsenceByPhone(?)', [phone]);

exports.checkSellerAbsence = phone =>
    mysql.query('CALL checkSellerAbsenceByPhone(?)', [phone]);