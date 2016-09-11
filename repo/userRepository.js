var mysql = require('../libs/dbs').mysql;

exports.checkCustomerAbsence = phone =>
    mysql.query('CALL checkCustomerAbsenceByPhone(?)', [phone]);

exports.checkSellerAbsence = phone =>
    mysql.query('CALL checkSellerAbsenceByPhone(?)', [phone]);

exports.register = (body, role) =>
    mysql.query('CALL register(?,?,?,?)', [body.phone, body.name, body.password, role]);

exports.getByIdAndRole = user =>
    mysql.query(`SELECT a.phone, b.name, b.role_id FROM users a
                 JOIN users_has_roles b ON b.user_id = a.id AND b.role_id = ?
                 WHERE a.id = ?`, [user.roleId, user.id])
        .spread(result => result[0]);

exports.login = body =>
    mysql.query('CALL logIn(?,?,?)', [body.role, body.phone, body.password])
        .spread(result => result[0][0]);