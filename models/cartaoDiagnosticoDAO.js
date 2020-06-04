
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

module.exports.getProcedimentos=function(patEscolhida,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select Procedimento_idProcedimento,nomeProcedimento from Patologia_has_Procedimento inner join Procedimento on Procedimento.idProcedimento=Patologia_has_Procedimento.Procedimento_idProcedimento where Patologia_idPatologia="+patEscolhida, function(err, results) {
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

module.exports.getSintomasProcedimentos=function(patEscolhida,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select idProcedimento,nomeSintoma from ProcedimentoHasSintoma inner join Sintoma on Sintoma.idSintoma=ProcedimentoHasSintoma.idSintoma where ProcedimentoHasSintoma.idProcedimento="+patEscolhida, function(err, results) {
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

module.exports.getTarefasProcedimentos=function(patEscolhida,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select idProcedimento,nomeTarefa from ProcedimentoHasTarefa inner join Tarefa on Tarefa.idTarefa=ProcedimentoHasTarefa.idTarefa where ProcedimentoHasTarefa.idProcedimento="+patEscolhida, function(err, results) {
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

module.exports.getPatologiasProcedimentos=function(patEscolhida,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("SELECT * FROM `Patologia_has_Procedimento` where Procedimento_idProcedimento="+patEscolhida, function(err, results) {
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

module.exports.getColmatacaoPrecoProcedimentos=function(patEscolhida,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select SUM(Procedimento_has_Recomendacao.colmatacaoRecomendacao)+(select SUM(Procedimento_has_Produto.colmatacaoProduto)from Procedimento_has_Produto where Procedimento_has_Produto.Procedimento_idProcedimento="+patEscolhida+") as ColmatacaoTotal,(select SUM(Recomendacao.precoRecomendacao) from Recomendacao inner join Procedimento_has_Recomendacao on Procedimento_has_Recomendacao.Recomendacao_idRecomendacao=Recomendacao.idRecomendacao where Procedimento_has_Recomendacao.Procedimento_idProcedimento="+patEscolhida+") +(select SUM(Produto.preco) from Produto inner join Procedimento_has_Produto on Procedimento_has_Produto.Produto_idProduto=Produto.idProduto where Procedimento_has_Produto.Procedimento_idProcedimento="+patEscolhida+") as PrecoTotal from Procedimento_has_Recomendacao where Procedimento_has_Recomendacao.Procedimento_idProcedimento="+patEscolhida, function(err, results) {
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

module.exports.getNomeProcedimentos=function(id,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("Select nomeProcedimento from Procedimento where idProcedimento="+id, function(err, results) {
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


module.exports.getFuncao=function(escolhido,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("select nomeFuncao from Funcao inner join SetorAtividade on SetorAtividade.idSetorAtividade=Funcao.Setor where SetorAtividade.nomeSetorAtividade='"+escolhido+"'", function(err, results) {
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
       conn.query("select DISTINCT(nomeSintoma)  from Sintoma", function(err, results) {
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
       conn.query("select DISTINCT(nomeTarefa) from Tarefa", function(err, results) {
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

module.exports.getTarefasB=function(id,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("Select DISTINCT(nomeTarefa) from Tarefa inner join ProcedimentoHasTarefa on ProcedimentoHasTarefa.idTarefa=Tarefa.idTarefa inner join Patologia_has_Procedimento on Patologia_has_Procedimento.Procedimento_idProcedimento=ProcedimentoHasTarefa.idProcedimento where Patologia_has_Procedimento.Patologia_idPatologia="+id, function(err, results) {
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

module.exports.getSintomasB=function(id,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("Select DISTINCT(nomeSintoma) from Sintoma inner JOIN ProcedimentoHasSintoma on ProcedimentoHasSintoma.idSintoma=Sintoma.idSintoma inner join Patologia_has_Procedimento on Patologia_has_Procedimento.Procedimento_idProcedimento=ProcedimentoHasSintoma.idProcedimento where Patologia_has_Procedimento.Patologia_idPatologia="+id, function(err, results) {
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

module.exports.getGrau=function(id,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("SELECT Grau FROM Patologia WHERE idPatologia="+id, function(err, results) {
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

module.exports.getDP=function(id,callback,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            callback(err,{code: 500, status: "Error in the connection to the database"})
        }
       conn.query("SELECT DP FROM Procedimento where idProcedimento="+id, function(err, results) {
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