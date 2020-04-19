
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
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}


module.exports.getFuncao=function(callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from Funcao", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}

module.exports.getSetorAtividade=function(callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from SetorAtividade", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}

module.exports.getTipoPatologia=function(callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from tipoPatologia order by idtipoPatologia", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}

module.exports.getPatologia=function(idTipo,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from Patologia where tipoPatologia_idtipoPatologia="+idTipo, function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}


module.exports.getSintomas=function(callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from Sintoma", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}


module.exports.getTarefas=function(callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from Tarefa", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}


module.exports.newSintoma=function(id,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("insert into sintomaNovo(idSintomaNovo,nomeSintomaNovo) values(null,'"+id+"')", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}

module.exports.newTarefa=function(id,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("insert into tarefaNova(idTarefaNova,tarefaNova) values(null,'"+id+"')", function(err, results) {
            conn.release();
            if (err) {
                console.log(err);
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            callback(false, {code: 200, status:"ok", data: results})
        })
       
    })
}