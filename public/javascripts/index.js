var availableTarefas = [];
var availableSintomas = [];
var totalTarefas=[];
var totalSintomas=[];
var contPat = 0;
var patologiaEscolhida = [];
var SintomasTarefasPatologia = [];
var dadosProcedimento = [];
var procedimento=[];

$(document).ready(function () {
  preencherSintomas();
  preencherTarefas();
  preencherGenero();
  preencherHabilitacao();
  preencherLocalidade();
      preencherSetor();
      sintomasSetAutoComplete();
  tarefasSetAutoComplete();

  $('table').on('click', 'img', function(e){
    $(this).closest('tr').remove()
  
 })




  var comboPatologia = document.getElementById("PatologiaId");
  var cont = 0;
  var contT = 0;




  $.ajax({
    url: "/GetTipoPatologia",
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (aux in res) {
        $.ajax({
          url: "/GetPatologia/" + res[aux].idtipoPatologia,
          method: "get",
          // sending in json
          contentType: "application/json",
          // receiving in json
          dataType: "json",
          success: function (resp, status, jqXHR) {
            
            if (resp.err) {
              
              return;
            }
            comboPatologia.innerHTML += "<optgroup label='" + res[contT].nomeTipoPatologia + "'>";


            cont++;
            for (i in resp) {
              comboPatologia.innerHTML += "<option value='" + resp[i].idPatologia + "'>" + resp[i].nomePatologia + "</option>"

              cont++;
            }
            comboPatologia.innerHTML += "  </optgroup>  ";
            comboPatologia.innerHTML += "<optgroup label=''>";
            document.getElementById("PatologiaId").selectedIndex = -1;

            contT++;
          }

          , error: function () { alert(JSON.stringify('error')); }

        });


      }
    }

    , error: function () { alert(JSON.stringify('error')); }

  });






  $("#tarefas")
    // don't navigate away from the field on tab when selecting an item
    .on("keydown", function (event) {
      if (event.key === ";" || event.key == "Enter") {
        
        var terms = split(this.value);
        // remove the current input
        // add the selected item
        var checkT = availableTarefas.includes(this.value);
        if (checkT == false) {
          addPalavraTarefa(this.value);
        }
        availableTarefas.splice(availableTarefas.indexOf(this.value),1);
        SintomasTarefasPatologia.push(this.value);
        var x = document.createElement("Chips");
        x.setAttribute("id",encodeURIComponent(this.value))
        x.innerHTML = terms + "<span class='closebtn' onClick=this.parentElement.style.display='none';readdT('"+encodeURIComponent(this.value)+"');removerIntroduzido('"+encodeURIComponent(this.value)+"')>x</span>";
        document.getElementById("areaTarefas").appendChild(x);
        this.value = "";
        return false;
      }
    }),

    $("#sintomas")
      // don't navigate away from the field on tab when selecting an item
      .on("keydown", function (event) {
        if (event.key === ";" || event.key == "Enter") {
          
          var terms = split(this.value);
          // remove the current input
          // add the selected item
          var check = availableSintomas.includes(this.value);
          if (check == false) {
            addPalavraSintoma(this.value);
          }
          SintomasTarefasPatologia.push(this.value);
          availableSintomas.splice(availableSintomas.indexOf(this.value),1);
          var x = document.createElement("Chips");
          x.setAttribute("id",encodeURIComponent(this.value))
          x.innerHTML = terms + "<span class='closebtn' onClick=this.parentElement.style.display='none';readdS('"+encodeURIComponent(this.value)+"');removerIntroduzido('"+encodeURIComponent(this.value)+"')>x</span>";
          document.getElementById("areaSintomas").appendChild(x);
          this.value = "";
          return false;
        }
      });
  document.getElementById("PatologiaId").selectedIndex = -1;

})
function addLinha() {
  if (contPat != 0) {
    var x = document.getElementById("patEscolhidas");
    if (x.innerHTML.indexOf("<tr><td></td><td></td><td></td><td></td></tr>") != -1) { }
    else {
      x.innerHTML += "<tr><td></td><td></td><td></td><td></td></tr>";
    }
  }
}
function verResultados() {
  var vazio=0;
  var arrId = [];
  var arrColm=[];
  var arrCusto=[];
  var arrPercentagem=[];

  $(':checkbox:checked').each(function () {
    vazio++;
    arrId.push($(this).closest('tr').attr('id'));
    arrPercentagem.push($(this).closest('tr').attr('percentagem'));
    arrColm.push($(this).closest('tr').attr('colm'))
    arrCusto.push($(this).closest('tr').attr('preco'))
  })
  localStorage.setItem("Percentagem", arrPercentagem);
  localStorage.setItem("Colmatacao", arrColm);
  localStorage.setItem("Custo", arrCusto);
  localStorage.setItem("ProcedimentosEscolhidos", arrId);


  if(vazio!=0)
{
  window.location.href = "prescricao.html";
}
else
{
  document.getElementById("ListaPOP").style.border="2px solid red";

  alert("Nenhum procedimento selecionado");
}

}
function preencherGenero() {
  var comboGenero = document.getElementById('GeneroComboId');
  $.ajax({
    url: "/GetGenero",
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {
        comboGenero.options[i] = new Option(res[i].nomeGenero, i);
        document.getElementById('GeneroComboId').selectedIndex = '-1';

        
      }
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}
function preencherHabilitacao() {
  var comboHabilitacao = document.getElementById('Habilitacoes');
  $.ajax({
    url: "/GetHabilitacao",
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {
        comboHabilitacao.options[i] = new Option(res[i].nomeHabilitacao, i);
        document.getElementById('Habilitacoes').selectedIndex = '-1';

        
      }
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}
function preencherLocalidade() {

  var comboLocalidade = document.getElementById('Localidade');
  $.ajax({
    url: "/GetLocalidade",
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {

        comboLocalidade.options[i] = new Option(res[i].nomeLocalidade, i);
        document.getElementById('Localidade').selectedIndex = '-1';
      }
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}
function preencherSetor() {
    
  var comboSetor = document.getElementById('setorAtividade');
  $.ajax({
    url: "/GetSetorAtividade",
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {

        comboSetor.options[i] = new Option(res[i].nomeSetorAtividade, i);
        document.getElementById('setorAtividade').selectedIndex = '-1';
      }
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}

function preencherFuncao() {
  
  document.getElementById('Funcao').length=0;
  var escolhido= document.getElementById("setorAtividade").options[setorAtividade.selectedIndex].innerHTML;
  var comboFuncao = document.getElementById('Funcao');
  $.ajax({
    url: "/GetFuncao/"+escolhido,
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {

        comboFuncao.options[i] = new Option(res[i].nomeFuncao, i);
        document.getElementById('Funcao').selectedIndex = '-1';
      }
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}
function preencherSintomas() {
  $.ajax({
    url: "/GetSintomas",
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {
        
        availableSintomas.push(res[i].nomeSintoma);

      }
      
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}
function preencherTarefas() {
  $.ajax({
    url: "/GetTarefas",
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {
        
        availableTarefas.push(res[i].nomeTarefa);

      }
      
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}
function addPalavraSintoma(sintoma) {
  $.ajax({
    url: "/NewSintoma/" + sintoma,
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}
function addPalavraTarefa(tarefa) {
  $.ajax({
    url: "/NewTarefa/" + tarefa,
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}
function listarSintomas() {
  $("#lsintomas").autocomplete("search", "");
}
function listarTarefas() {
  $("#ltarefas").autocomplete("search", "");

}
function adicionarPat(patEscolhida) {
  
  if (contPat == 0) {
    patologiaEscolhida.push(patEscolhida);
    SintomasTarefasPatologia.push(patEscolhida);
    availableSintomas = [];
    availableTarefas = [];
    $("#PatologiaId option[value=" + patEscolhida + "]").hide();
    $.ajax({
      url: "/GetSintoma/" + patEscolhida,
      method: "get",
      // sending in json
      contentType: "application/json",
      // receiving in json
      dataType: "json",
      success: function (res, status, jqXHR) {
        for (i in res) {
          var x = document.getElementById("patEscolhidas");
          x.innerHTML += "<tr><td>" + res[i].nomePatologia + "</td><td>" + res[i].descricaoPatologia + "</td><td>" + res[i].referenciaPatologia + "</td><td id=lixo ><img onclick=apagar("+patEscolhida+") src='images/lixo.png'></td></tr>";
          
        }

      }

      , error: function () { alert(JSON.stringify('error')); }

    });
    
    contPat++;
    preencherSintomasB();
    preencherTarefasB();
  }

  if (contPat != 0) {

    var x = document.getElementById("patEscolhidas");
    if (x.innerHTML.indexOf("<tr><td></td><td></td><td></td><td></td></tr>") != -1) {
      patologiaEscolhida.push(patEscolhida);
      SintomasTarefasPatologia.push(patEscolhida);
    $("#PatologiaId option[value=" + patEscolhida + "]").hide();
      contPat++;
      $.ajax({

        url: "/GetSintoma/" + patEscolhida,
        method: "get",
        // sending in json
        contentType: "application/json",
        // receiving in json
        dataType: "json",
        
        success: function (res, status, jqXHR) {
          for (i in res) {

            x.deleteRow(contPat);
            x.innerHTML += "<tr><td>" + res[i].nomePatologia + "</td><td>" + res[i].descricaoPatologia + "</td><td>" + res[i].referenciaPatologia + "</td><td id=lixo ><img onclick=apagar("+patEscolhida+") src='images/lixo.png'></td></tr>";
            

          }

        }

        , error: function () { alert(JSON.stringify('error')); }

      });
      preencherSintomasB();
      preencherTarefasB();
    }


  }
  document.getElementById("PatologiaId").selectedIndex = -1;

  
}
function determinarPOP() {
  document.getElementById("determinarpop").disabled = true;

  var percentagem;
  var valoresIguais;
  var tabela = document.getElementById("POP");
  tabela.style.display = "none";

  $("#POP tr:gt(0)").remove();

  var colm;
  var preco;
  var i=0;

  var x = document.getElementById("ListaPOP");
  
  if(patologiaEscolhida.length!=0)
  {
  $.ajax({
    url: "/GetGrau/"+patologiaEscolhida[0],
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }
      document.getElementById("grau").innerHTML="Grau </br>"+res[0].Grau;
      
      
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
 
  recur();

    function recur()
    {
    $.ajax({
      url: "/GetProcedimentos/" + patologiaEscolhida[i],
      method: "get",
      // sending in json
      contentType: "application/json",
      // receiving in json
      dataType: "json",
      success: function (res1, status, jqXHR) {
        
        if (res1.err) {
          
          return;
        }
        var a=0;
        console.log(res1);
        setTimeout(function(){ variosProcedimentos();}, 250);

        function variosProcedimentos() { // usar uma funcao recursiva aqui 
        
          // obter sintomas do procedimento
          
         $.ajax({
            url: "/GetSintomasProcedimentos/" + res1[a].Procedimento_idProcedimento,
            method: "get",
            // sending in json
            contentType: "application/json",
            // receiving in json
            dataType: "json",
            success: function (res2, status, jqXHR) {
              
              if (res2.err) {
                
                return;
              }
              

              for (b in res2) {
                dadosProcedimento.push(res2[b].nomeSintoma);
              }
            

          // terminou de obter os sintomas
          // obter as tarefas do procedimento
          $.ajax({
          url: "/GetTarefasProcedimentos/" + res1[a].Procedimento_idProcedimento,
          method: "get",
          // sending in json
          contentType: "application/json",
          // receiving in json
          dataType: "json",
          success: function (res3, status, jqXHR) {
            
            if (res3.err) {
              
              return;
            }
            for (c in res3) {
              dadosProcedimento.push(res3[c].nomeTarefa);
            }


          

         // terminou de obter as tarefas
        // obter todas as patologias do Procedimento
        $.ajax({
          url: "/GetPatologiasProcedimentos/" + res1[a].Procedimento_idProcedimento,
          method: "get",
          // sending in json
          contentType: "application/json",
          // receiving in json
          dataType: "json",
          success: function (res4, status, jqXHR) {
            
            if (res4.err) {
              
              return;
            }
            for (d in res4) {
              dadosProcedimento.push(res4[d].Patologia_idPatologia);
            }
        
          

      // terminou de obter as patologias

        // obter a colmatacao e o preco 
 
      
          $.ajax({
            url: "/GetColmatacaoPrecoProcedimentos/" + res1[a].Procedimento_idProcedimento,
            method: "get",
            // sending in json
            contentType: "application/json",
            // receiving in json
            dataType: "json",
            success: function (res5, status, jqXHR) {
              
              if (res5.err) {
                
                return;
              }
              colm=res5[0].ColmatacaoTotal;
              preco=res5[0].PrecoTotal;
            
            console.log("aqui");
       
              
            valoresIguais = 0;
              for (var p = 0; p < SintomasTarefasPatologia.length; p++) {
                for (var o = 0; o < dadosProcedimento.length; o++) {
                  if (SintomasTarefasPatologia[p] == dadosProcedimento[o]) {
                    valoresIguais++;
                  }
                }
              }
              percentagem = (parseFloat(valoresIguais / dadosProcedimento.length)*100).toFixed(0);

         

           x.innerHTML+="<tr id="+res1[a].Procedimento_idProcedimento+" percentagem="+percentagem+" colm="+colm+"  preco="+preco+"><td >"+percentagem+" %</td><td>"+res1[a].nomeProcedimento+"</td><td >"+colm+" %</td><td>"+preco+" €</td><td><input type='checkbox'></td></tr> " ;
           valoresIguais=0;
           percentagem=0;
           colm=0;
           preco=0;
           dadosProcedimento=[];
           a++;
           if(a<res1.length)
           {
           
           setTimeout(function(){ variosProcedimentos();}, 250);
           }
           else
           {
            console.log(patologiaEscolhida.length);
            console.log(i);
            if(i<patologiaEscolhida.length-1)
            {
              console.log("entrou");
              i++;
            setTimeout(function(){ recur();}, 250);
            }
            else
            {
              tabela.style.display = "block";
              document.getElementById("determinarpop").disabled = false;
            }
           }
       
        }
        , error: function () { alert(JSON.stringify('error')); }
      });
    }
    , error: function () { alert(JSON.stringify('error')); }
  });
}
, error: function () { alert(JSON.stringify('error')); }
});
}
, error: function () { alert(JSON.stringify('error')); }
});
}

      
      }
    });
}
  }



  
}
          

function preencherSintomasB() {
  $.ajax({
    url: "/GetSintomasB/" + patologiaEscolhida[contPat - 1],
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {
        
        availableSintomas.push(res[i].nomeSintoma);

      }
      totalSintomas=availableSintomas;

      
    }

    , error: function () { alert(JSON.stringify('error')); }

  });

  sintomasSetAutoComplete();
}
function preencherTarefasB() {
  $.ajax({
    url: "/GetTarefasB/" + patologiaEscolhida[contPat - 1],
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {
        
        availableTarefas.push(res[i].nomeTarefa);

      }
      totalTarefas=availableTarefas;
      
    }

    , error: function () { alert(JSON.stringify('error')); }

  });

  tarefasSetAutoComplete();
}
function sintomasSetAutoComplete() {
  $("#lsintomas").autocomplete({
    minLength: 0,
    source: function (request, response) {
      // delegate back to autocomplete, but extract the last term
      response($.ui.autocomplete.filter(
        availableSintomas, extractLast(request.term)));
    },
    focus: function () {
      // prevent value inserted on focus
      return false;
    },
    select: function (event, ui) {
      var terms = split(this.value);
      // remove the current input
      SintomasTarefasPatologia.push(ui.item.value);
      availableSintomas.splice(availableSintomas.indexOf(ui.item.value),1);
      terms.pop();
      // add the selected item
      terms.push(ui.item.value);
      // add placeholder to get the comma-and-space at the end
      var x = document.createElement("Chips");
      x.setAttribute("id",encodeURIComponent(ui.item.value))
      x.innerHTML = terms + "<span class='closebtn' onClick=this.parentElement.style.display='none';readdS('"+encodeURIComponent(ui.item.value)+"');removerIntroduzido('"+encodeURIComponent(ui.item.value)+"')>x</span>";
      document.getElementById("areaSintomas").appendChild(x);
      return false;
    }
  });
}
function tarefasSetAutoComplete() {
  $("#ltarefas").autocomplete({
    minLength: 0,
    source: function (request, response) {
      // delegate back to autocomplete, but extract the last term
      response($.ui.autocomplete.filter(
        availableTarefas, extractLast(request.term)));
    },
    focus: function () {
      // prevent value inserted on focus
      return false;
    },
    select: function (event, ui) {
      var terms = split(this.value);
      // remove the current input
      SintomasTarefasPatologia.push(ui.item.value);
      availableTarefas.splice(availableTarefas.indexOf(ui.item.value),1);
      terms.pop();
      // add the selected item
      terms.push(ui.item.value);
      // add placeholder to get the comma-and-space at the end
      var x = document.createElement("Chips");
      x.setAttribute("id",encodeURIComponent(ui.item.value))
      x.innerHTML = terms + "<span class='closebtn' onClick=this.parentElement.style.display='none';readdT('"+encodeURIComponent(ui.item.value)+"');removerIntroduzido('"+encodeURIComponent(ui.item.value)+"')>x</span>";
      document.getElementById("areaTarefas").appendChild(x);
      return false;
    }
  });
}
function split(val) {
  return val.split(/;\s*/);
}
function extractLast(term) {
  return split(term).pop();
}

function removerIntroduzido(valor)
{
  var ValorCerto=decodeURIComponent(valor);
  //this.parent.style.display='none';
  SintomasTarefasPatologia.splice(SintomasTarefasPatologia.indexOf(ValorCerto),1);
  
}

function apagar(value)
{
  contPat--;
  $("#PatologiaId option[value=" + value + "]").show();
  SintomasTarefasPatologia.splice(SintomasTarefasPatologia.indexOf(value),1);
  patologiaEscolhida.splice(patologiaEscolhida.indexOf(value),1);
  console.log(availableSintomas);
  console.log(availableTarefas);
  if(contPat==0)
  {
    preencherTarefas();
    preencherSintomas();
  }
  else
  {
  $.ajax({
    url: "/GetTarefasB/" + value,
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {
        availableTarefas.splice(availableTarefas.indexOf(res[i].nomeTarefa),1);

      }
      totalTarefas=availableTarefas;
      
    }

    , error: function () { alert(JSON.stringify('error')); }






  });

  $.ajax({
    url: "/GetSintomasB/" + value,
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      
      if (res.err) {
        
        return;
      }

      for (i in res) {
        
        availableSintomas.splice(availableSintomas.indexOf(res[i].nomeSintoma),1);

      }
      totalSintomas=availableSintomas;
      

      
    }

    , error: function () { alert(JSON.stringify('error')); }

  });
}

atualizarSintomas();
atualizarTarefas();
  tarefasSetAutoComplete();
  sintomasSetAutoComplete();
  if(contPat==0)
  {
    apagarTudoSintomas();

    apagarTudoTarefas();

  }

 

 

  if($('#POP').is(':visible'))
{
  determinarPOP();
}
 

 

}

function readdS(value)
{
  availableSintomas.push(decodeURIComponent(value));
}

function readdT(value)
{
  availableTarefas.push(decodeURIComponent(value));
}



function atualizarTarefas()
{
  var tem=0;
  var divTarefas =$("#areaTarefas").find("chips").map(function() { return this.id; }).get(); 
    for(var i=0;i<divTarefas.length;i++)
  {
    for(var e=0;e<totalTarefas.length;e++)
    {
      if(decodeURIComponent(divTarefas[i])==totalTarefas[e])
      {
        tem=1;
      }
    }
    if(tem==0)
    {
    removerIntroduzido(divTarefas[i]);
    document.getElementById(divTarefas[i]).style.display='none';
    }
    
  }
}

function atualizarSintomas()
{
  console.log(totalSintomas);

  var tem=0;
  var divSintomas =$("#areaSintomas").find("chips").map(function() { return this.id; }).get(); 
  console.log(divSintomas);
  for(var i=0;i<divSintomas.length;i++)
  {
    tem=0;
    console.log(divSintomas[i]);
    console.log(availableSintomas);
    for(var e=0;e<totalSintomas.length;e++)
    {
      if(decodeURIComponent(divSintomas[i])==totalSintomas[e])
      {
        tem=1;
      }
    
    }
    if(tem==0)
  {
    console.log(divSintomas[i]);
    removerIntroduzido(divSintomas[i]);
    document.getElementById(divSintomas[i]).style.display='none';    

  }
  
  }
}


function apagarTudoSintomas()
{
  $("#areaSintomas").find("chips").hide(); 
}

function apagarTudoTarefas()
{
  
  $("#areaTarefas").find("chips").hide(); 

  
}

function abrirMembros() {
  $('.hover_bkgr_fricc').show();

}

function fecharPop() {
  
  $('.hover_bkgr_fricc').hide();
}