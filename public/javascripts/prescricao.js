var precoTotalProduto=0;
var colmatacaoTotalProduto=0;
var precoTotalRecomendacao=0;
var colmatacaoTotalRecomendacao=0;
var ids=localStorage.getItem("ProcedimentosEscolhidos").split(",");
for (var i=0; i<ids.length; i++) {
  ids[i] = parseInt(ids[i], 10);
}
var percentagens=localStorage.getItem("Percentagem").split(",");
var colmatacao=localStorage.getItem("Colmatacao").split(",");
var custo=localStorage.getItem("Custo").split(",");
for (var i=0; i<percentagens.length; i++) {
  percentagens[i] = parseInt(percentagens[i], 10);
}
for (var i=0; i<colmatacao.length; i++) {
  colmatacao[i] = parseInt(colmatacao[i], 10);
}
for (var i=0; i<custo.length; i++) {
  custo[i] = parseInt(custo[i], 10);
}

$(document).ready(function(){
console.log(ids);
console.log(percentagens);
console.log(colmatacao);
console.log(custo);
preencherTabela1(ids[ids.length-1]);
preencherTabela2(ids[ids.length-1]);
            preencherComboBox();
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
function preencherComboBox()
{
  var i=0;
  again();
  var x = document.getElementById("PatologiaPOP");
function again()  { 
    
    $.ajax({
    url: "/GetNomeProcedimentos/"+ ids[i],
    method:"get",
    // sending in json
    contentType:"application/json",
    // receiving in json
    dataType:"json",
    success: function(res,status,jqXHR) {
      for(a in res)
      {
        console.log(i);
        x.innerHTML+="<option value='"+ids[i]+"'>"+res[a].nomeProcedimento+" (Colmatação "+colmatacao[i] +" % Custo Estimado "+custo[i]+" € )"+"</option>"
        i++;
        if(i<ids.length)
        again()
      }
      
    }
    
    , error : function() { alert(JSON.stringify('error')); }
    
    });

  }

}

function atualizarTabela(id)
{
 
  console.log("oi");
  $("#tableRP tr:gt(0)").remove();
  $("#tableRProdutos tr:gt(0)").remove();
  preencherTabela1(id);
  preencherTabela2(id);
  var colm1=document.getElementById("colmatacaoCimaP");
        colm1.innerHTML="Σ  %";
        var colp1=document.getElementById("precoCimaP");
        colp1.innerHTML="Σ  €";

        var colm2=document.getElementById("colmatacaoCimaR");
        colm2.innerHTML="Σ %";
        var colp2=document.getElementById("precoCimaR");
        colp2.innerHTML="Σ €";
       precoTotalProduto=0;
colmatacaoTotalProduto=0;
precoTotalRecomendacao=0;
colmatacaoTotalRecomendacao=0;

}

function preencherTabela1(id)
{

  $.ajax({
    url: "/GetDP/"+ id,
    method:"get",
    // sending in json
    contentType:"application/json",
    // receiving in json
    dataType:"json",
    success: function(res,status,jqXHR) {
      document.getElementById("DP").innerHTML="<b> D&P %<br></b>"+res[0].DP+"</b>";

      
    }
    
    , error : function() { alert(JSON.stringify('error')); }
    
    });

$.ajax({
    url: "/GetProdutosProcedimentos/"+ id,
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
  }
  function preencherTabela2(id)
  {
$.ajax({
    url: "/GetRecomendacoesProcedimentos/"+ id,
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
  }
  function abrirMembros() {
    $('.hover_bkgr_fricc').show();
  
  }
  
  function fecharPop() {
    
    $('.hover_bkgr_fricc').hide();
  }