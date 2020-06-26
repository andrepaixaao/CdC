var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit:1,
    host     : 'remotemysql.com',
    user     : 'YfKYvyztwT',
    password : 'Z0zxhuNmSy',
    database : 'YfKYvyztwT',
    multipleStatements:true
});

module.exports.pool = pool;
