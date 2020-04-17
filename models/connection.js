var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'remotemysql.com',
    user     : 'YfKYvyztwT',
    password : 'Z0zxhuNmSy',
    database : 'YfKYvyztwT',
    port:3306
});

module.exports.pool = pool;
