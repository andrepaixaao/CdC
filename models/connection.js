var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit:300,
    host     : 'remotemysql.com',
    user     : 'YfKYvyztwT',
    password : 'Z0zxhuNmSy',
    database : 'YfKYvyztwT',
    port:3306,
    multipleStatements:true
});

module.exports.pool = pool;
