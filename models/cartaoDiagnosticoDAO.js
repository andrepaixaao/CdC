
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

module.exports.getProcedimentos=function(callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("Select idProcedimento,nomeProcedimento, (select SUM(Procedimento_has_Recomendacao.colmatacaoRecomendacao) from Procedimento_has_Recomendacao)+(select SUM(Procedimento_has_Produto.colmatacaoProduto)from Procedimento_has_Produto) as ColmatacaoTotal, (select SUM(Recomendacao.precoRecomendacao) from Recomendacao inner join Procedimento_has_Recomendacao on Procedimento_has_Recomendacao.Recomendacao_idRecomendacao=Recomendacao.idRecomendacao)+(select SUM(Produto.preco) from Produto inner join Procedimento_has_Produto on Procedimento_has_Produto.Produto_idProduto=Produto.idProduto) as PrecoTotal  from Procedimento       ", function(err, results) {
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

module.exports.getProcedimentosEscolhidos=function(procEscolhido,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("Select idProcedimento,nomeProcedimento, (select SUM(Procedimento_has_Recomendacao.colmatacaoRecomendacao) from Procedimento_has_Recomendacao)+(select SUM(Procedimento_has_Produto.colmatacaoProduto)from Procedimento_has_Produto) as ColmatacaoTotal, (select SUM(Recomendacao.precoRecomendacao) from Recomendacao inner join Procedimento_has_Recomendacao on Procedimento_has_Recomendacao.Recomendacao_idRecomendacao=Recomendacao.idRecomendacao)+(select SUM(Produto.preco) from Produto inner join Procedimento_has_Produto on Procedimento_has_Produto.Produto_idProduto=Produto.idProduto) as PrecoTotal  from Procedimento where idProcedimento="+procEscolhido, function(err, results) {
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

module.exports.getProdutosProcedimento=function(procEscolhido,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select descricaoProduto,nomeTipoProduto,idProduto,colmatacaoProduto,preco,referenciaProduto,adaptacaoProduto,beneficioProduto,requesitoProduto from Produto inner join Procedimento_has_Produto on Procedimento_has_Produto.Produto_idProduto=Produto.idProduto inner join tipoProduto on Produto.tipoProduto_idTipoProduto=tipoProduto.idTipoProduto where Procedimento_has_Produto.Procedimento_idProcedimento="+procEscolhido, function(err, results) {
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


module.exports.getRecomendacoesProcedimento=function(procEscolhido,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select descricaoRecomendacao,idRecomendacao,precoRecomendacao,referenciaRecomendacao,colmatacaoRecomendacao,adaptacaoRecomendacao,beneficioRecomendacao,requisitoRecomendacao, nomeTipoRecomendacaocol from Recomendacao inner join Procedimento_has_Recomendacao on Procedimento_has_Recomendacao.Recomendacao_idRecomendacao=Recomendacao.idRecomendacao inner join tipoRecomendacao on Recomendacao.tipoRecomendacao_idtipoRecomendacao=tipoRecomendacao.idtipoRecomendacao where Procedimento_has_Recomendacao.Procedimento_idProcedimento="+procEscolhido, function(err, results) {
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

module.exports.getPatologiaEspecifica=function(id,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select * from Patologia where idPatologia="+id, function(err, results) {
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