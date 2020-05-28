var availableTarefas = [];
var availableSintomas = [];
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
  preencherFuncao();
  sintomasSetAutoComplete();
  tarefasSetAutoComplete();



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
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
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
            console.log(status);
            if (resp.err) {
              console.log(JSON.stringify(resp));
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
        console.log("entrei");
        var terms = split(this.value);
        // remove the current input
        // add the selected item
        var checkT = availableTarefas.includes(this.value);
        if (checkT == false) {
          addPalavraTarefa(this.value);
        }
        SintomasTarefasPatologia.push(this.value);
        var x = document.createElement("Chips");
        x.innerHTML = terms + "<span class='closebtn' onClick=this.parentElement.style.display='none'>x</span>";
        document.getElementById("areaTarefas").appendChild(x);
        this.value = "";
        return false;
      }
    }),

    $("#sintomas")
      // don't navigate away from the field on tab when selecting an item
      .on("keydown", function (event) {
        if (event.key === ";" || event.key == "Enter") {
          console.log("entrei");
          var terms = split(this.value);
          // remove the current input
          // add the selected item
          var check = availableSintomas.includes(this.value);
          if (check == false) {
            addPalavraSintoma(this.value);
          }
          SintomasTarefasPatologia.push(this.value);
          var x = document.createElement("Chips");
          x.innerHTML = terms + "<span class='closebtn' onClick=this.parentElement.style.display='none'>x</span>";
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
    if (x.innerHTML.indexOf("<tr><td></td><td></td><td></td></tr>") != -1) { }
    else {
      x.innerHTML += "<tr><td></td><td></td><td></td></tr>";
    }
  }
}
function verResultados() {
  var arrId = [];
  var arrColm=[];
  var arrCusto=[];
  var arrPercentagem=[];

  $(':checkbox:checked').each(function () {
    arrId.push($(this).closest('tr').attr('id'));
    arrPercentagem.push($(this).closest('tr').attr('percentagem'));
    arrColm.push($(this).closest('tr').attr('colm'))
    arrCusto.push($(this).closest('tr').attr('preco'))
  })
  localStorage.setItem("Percentagem", arrPercentagem);
  localStorage.setItem("Colmatacao", arrColm);
  localStorage.setItem("Custo", arrCusto);
  localStorage.setItem("ProcedimentosEscolhidos", arrId);




  window.location.href = "prescricao.html";
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
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
        return;
      }

      for (i in res) {
        comboGenero.options[i] = new Option(res[i].nomeGenero, i);
        document.getElementById('GeneroComboId').selectedIndex = '-1';

        console.log(res[i])
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
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
        return;
      }

      for (i in res) {
        comboHabilitacao.options[i] = new Option(res[i].nomeHabilitacao, i);
        document.getElementById('Habilitacoes').selectedIndex = '-1';

        console.log(res[i])
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
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
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
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
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
  var comboFuncao = document.getElementById('Funcao');
  $.ajax({
    url: "/GetFuncao",
    method: "get",
    // sending in json
    contentType: "application/json",
    // receiving in json
    dataType: "json",
    success: function (res, status, jqXHR) {
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
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
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
        return;
      }

      for (i in res) {
        console.log(res);
        availableSintomas.push(res[i].nomeSintoma);

      }
      console.log(availableSintomas);
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
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
        return;
      }

      for (i in res) {
        console.log(res);
        availableTarefas.push(res[i].nomeTarefa);

      }
      console.log(availableSintomas);
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
      console.log(status);
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
      console.log(status);
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
  console.log(availableSintomas);
  if (contPat == 0) {
    patologiaEscolhida.push(patEscolhida);
    SintomasTarefasPatologia.push(patEscolhida);
    availableSintomas = [];
    availableTarefas = [];
    document.getElementById("PatologiaId").remove(document.getElementById("PatologiaId").selectedIndex);
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
          x.innerHTML += "<tr><td>" + res[i].nomePatologia + "</td><td>" + res[i].descricaoPatologia + "</td><td>" + res[i].referenciaPatologia + "</td></tr>";
          console.log(res);
        }

      }

      , error: function () { alert(JSON.stringify('error')); }

    });
    console.log("isto metia");
    contPat++;
    preencherSintomasB();
    preencherTarefasB();
  }

  if (contPat != 0) {

    var x = document.getElementById("patEscolhidas");
    if (x.innerHTML.indexOf("<tr><td></td><td></td><td></td></tr>") != -1) {
      patologiaEscolhida.push(patEscolhida);
      SintomasTarefasPatologia.push(patEscolhida);
      document.getElementById("PatologiaId").remove(document.getElementById("PatologiaId").selectedIndex);

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
            x.innerHTML += "<tr><td>" + res[i].nomePatologia + "</td><td>" + res[i].descricaoPatologia + "</td><td>" + res[i].referenciaPatologia + "</td></tr>";
            console.log(res);

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
  var percentagem;
  var valoresIguais;
  var tabela = document.getElementById("POP");
  var colm;
  var preco;
  var nome;
  var id;
  var i=0;
  tabela.style.display = "block";
  var x = document.getElementById("ListaPOP");
  console.log(patologiaEscolhida);
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
        console.log(status);
        if (res1.err) {
          console.log(JSON.stringify(res1));
          return;
        }
  
        for (a in res1) {
          id=res1[a].Procedimento_idProcedimento;
          nome=res1[a].nomeProcedimento;
          // obter sintomas do procedimento
          
          $.ajax({
            url: "/GetSintomasProcedimentos/" + res1[a].Procedimento_idProcedimento,
            method: "get",
            // sending in json
            contentType: "application/json",
            // receiving in json
            dataType: "json",
            success: function (res2, status, jqXHR) {
              console.log(status);
              if (res2.err) {
                console.log(JSON.stringify(res2));
                return;
              }
              console.log(res2);

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
            console.log(status);
            if (res3.err) {
              console.log(JSON.stringify(res3));
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
            console.log(status);
            if (res4.err) {
              console.log(JSON.stringify(res4));
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
              console.log(status);
              if (res5.err) {
                console.log(JSON.stringify(res5));
                return;
              }
              colm=res5[0].ColmatacaoTotal;
              preco=res5[0].PrecoTotal;
            
            
       
              console.log(dadosProcedimento);
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
           i++;
           if(i<patologiaEscolhida.length)
           recur();
        
      
  


       
          
       

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
   
      
        

       
function abrirMembros() {
  $('.hover_bkgr_fricc').show();

}

function fecharPop() {
  console.log("boas");
  $('.hover_bkgr_fricc').hide();
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
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
        return;
      }

      for (i in res) {
        console.log(res);
        availableSintomas.push(res[i].nomeSintoma);

      }
      console.log(availableSintomas);
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
      console.log(status);
      if (res.err) {
        console.log(JSON.stringify(res));
        return;
      }

      for (i in res) {
        console.log(res);
        availableTarefas.push(res[i].nomeTarefa);

      }
      console.log(availableSintomas);
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
      terms.pop();
      // add the selected item
      terms.push(ui.item.value);
      // add placeholder to get the comma-and-space at the end
      var x = document.createElement("Chips");
      x.innerHTML = terms + "<span class='closebtn' onClick=this.parentElement.style.display='none'>x</span>";
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

      terms.pop();
      // add the selected item
      terms.push(ui.item.value);
      // add placeholder to get the comma-and-space at the end
      var x = document.createElement("Chips");
      x.innerHTML = terms + "<span class='closebtn' onClick=this.parentElement.style.display='none'>x</span>";
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