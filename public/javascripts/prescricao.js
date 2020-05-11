var precoTotalProduto=0;
var colmatacaoTotalProduto=0;
var precoTotalRecomendacao=0;
var colmatacaoTotalRecomendacao=0;

$(document).ready(function(){
    $.ajax({
        url: "/GetProcedimentosEscolhidos/"+localStorage.getItem("ProcedimentosEscolhidos"),
        method:"get",
        // sending in json
        contentType:"application/json",
        // receiving in json
        dataType:"json",
        success: function(res,status,jqXHR) {
          for(i in res)
          {
            var x = document.getElementById("PatologiaPOP");
            x.innerHTML+="<option value='"+res[i].idProcedimento+"'>"+res[i].nomeProcedimento+" (Colmatação "+res[i].ColmatacaoTotal +" % Custo Estimado "+res[i].PrecoTotal+" € )"+"</option>"


            console.log(res);
          }
          
        }
        
        , error : function() { alert(JSON.stringify('error')); }
        
        });


        $.ajax({
            url: "/GetProdutosProcedimentos/"+localStorage.getItem("ProcedimentosEscolhidos"),
            method:"get",
            // sending in json
            contentType:"application/json",
            // receiving in json
            dataType:"json",
            success: function(res,status,jqXHR) {
              for(i in res)
              {
                var x= document.getElementById("tableRProdutos");
                x.innerHTML+="<tr id="+res[i].idProduto+"><td>"+res[i].nomeTipoProduto+"</td><td>"+res[i].descricaoProduto+"</td><td>"+ res[i].referenciaProduto+"</td><td>"+res[i].adaptacaoProduto+"</td><td>"+res[i].beneficioProduto+" %</td><td>"+res[i].colmatacaoProduto+" %</td><td>"+res[i].preco+" €</td><td>"+res[i].requesitoProduto+"</td><td><input id=P"+res[i].idProduto+" type='checkbox' onclick='somarProd("+res[i].idProduto+","+res[i].preco+","+res[i].colmatacaoProduto+")'></td></tr>";
    
                console.log(res);
              }
              
            }
            
            , error : function() { alert(JSON.stringify('error')); }
            
            });

            
        $.ajax({
            url: "/GetRecomendacoesProcedimentos/"+localStorage.getItem("ProcedimentosEscolhidos"),
            method:"get",
            // sending in json
            contentType:"application/json",
            // receiving in json
            dataType:"json",
            success: function(res,status,jqXHR) {
              for(i in res)
              {
                var y= document.getElementById("tableRP");
                y.innerHTML+="<tr id="+res[i].idRecomendacao+"><td>"+res[i].nomeTipoRecomendacaocol+"</td><td>"+res[i].descricaoRecomendacao+"</td><td>"+ res[i].referenciaRecomendacao+"</td><td>"+res[i].adaptacaoRecomendacao+"</td><td>"+res[i].beneficioRecomendacao+" %</td><td>"+res[i].colmatacaoRecomendacao+" %</td><td>"+res[i].precoRecomendacao+" €</td><td>"+res[i].requisitoRecomendacao+"</td><td><input id=R"+res[i].idRecomendacao+" type='checkbox' onclick='somarRec("+res[i].idRecomendacao+","+res[i].precoRecomendacao+","+res[i].colmatacaoRecomendacao+")'></td></tr>";
    
                console.log(res);
              }
              
            }
            
            , error : function() { alert(JSON.stringify('error')); }
            
            });





    
})


function somarProd(id,preco,colmatacao)
{
    if ($('#P'+id).is(':checked'))
    {
        precoTotalProduto+=preco;
        colmatacaoTotalProduto+=colmatacao;
        var colm=document.getElementById("colmatacaoCimaP");
        colm.innerHTML="Σ "+colmatacaoTotalProduto+" %";
        var colp=document.getElementById("precoCimaP");
        colp.innerHTML="Σ "+precoTotalProduto+" €";
    }
    else
    {
        precoTotalProduto-=preco;
        colmatacaoTotalProduto-=colmatacao;
        var colm=document.getElementById("colmatacaoCimaP");
        colm.innerHTML="Σ "+colmatacaoTotalProduto+" %";
        var colp=document.getElementById("precoCimaP");
        colp.innerHTML="Σ "+precoTotalProduto+" €";
    }
    
}


function somarRec(id,preco,colmatacao)
{
    if ($('#R'+id).is(':checked'))
    {
        precoTotalRecomendacao+=preco;
        colmatacaoTotalRecomendacao+=colmatacao;
        var colm=document.getElementById("colmatacaoCimaR");
        colm.innerHTML="Σ "+colmatacaoTotalRecomendacao+" %";
        var colp=document.getElementById("precoCimaR");
        colp.innerHTML="Σ "+precoTotalRecomendacao+" €";
    }
    else
    {
        precoTotalRecomendacao-=preco;
        colmatacaoTotalRecomendacao-=colmatacao;
        var colm=document.getElementById("colmatacaoCimaR");
        colm.innerHTML="Σ "+colmatacaoTotalRecomendacao+" %";
        var colp=document.getElementById("precoCimaR");
        colp.innerHTML="Σ "+precoTotalRecomendacao+" €";
    }
    
}