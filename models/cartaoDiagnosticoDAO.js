
var pool = require('./connection').pool;

module.exports.getGenero=function(callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from Genero", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            console.log(results)
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}

module.exports.getHabilitacao=function(callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from Habilitacao", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            console.log(results)
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}

module.exports.getLocalidade=function(callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from Localidade", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            console.log(results)
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}


