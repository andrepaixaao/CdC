var availableTarefas = [];
  
var availableSintomas= [];
var contPat=0;


$(document).ready(function(){
  preencherSintomas();
  preencherTarefas();
  preencherGenero();
  preencherHabilitacao();
  preencherLocalidade();
  preencherSetor();
  preencherFuncao();


 
  var comboPatologia=document.getElementById("PatologiaId");
  var cont=0;
  var contT=0;

  
  $( "#lsintomas" ).autocomplete({
    minLength: 0,
    source: function( request, response ) {
      // delegate back to autocomplete, but extract the last term
      response( $.ui.autocomplete.filter(
        availableSintomas, extractLast( request.term ) ) );
    },
    focus: function() {
      // prevent value inserted on focus
      return false;
    },
    select: function( event, ui ) {
      var terms = split( this.value );
      // remove the current input
      terms.pop();
      // add the selected item
      terms.push( ui.item.value );
      // add placeholder to get the comma-and-space at the end
      var x = document.createElement("Chips");
      x.innerHTML=terms+"<span class='closebtn' onClick=this.parentElement.style.display='none'>x</span>";
      document.getElementById("areaSintomas").appendChild(x);
      return false;
    }
  });

  $( "#ltarefas" ).autocomplete({
    minLength: 0,
    source: function( request, response ) {
      // delegate back to autocomplete, but extract the last term
      response( $.ui.autocomplete.filter(
        availableTarefas, extractLast( request.term ) ) );
    },
    focus: function() {
      // prevent value inserted on focus
      return false;
    },
    select: function( event, ui ) {
      var terms = split( this.value );
      // remove the current input
      terms.pop();
      // add the selected item
      terms.push( ui.item.value );
      // add placeholder to get the comma-and-space at the end
      var x = document.createElement("Chips");
      x.innerHTML=terms+"<span class='closebtn' onClick=this.parentElement.style.display='none'>x</span>";
      document.getElementById("areaTarefas").appendChild(x);
      return false;
    }
  });

  $.ajax({
    url: "/GetTipoPatologia",
    method:"get",
    // sending in json
    contentType:"application/json",
    // receiving in json
    dataType:"json",
    success: function(res,status,jqXHR) {
        console.log(status);
        if (res.err) {
            console.log(JSON.stringify(res));
            return;
        }

        for(aux in res)  {
                   $.ajax({
          url: "/GetPatologia/"+res[aux].idtipoPatologia,
          method:"get",
          // sending in json
          contentType:"application/json",
          // receiving in json
          dataType:"json",
          success: function(resp,status,jqXHR) {
              console.log(status);
              if (resp.err) {
                  console.log(JSON.stringify(resp));
                  return;
              }
              comboPatologia.innerHTML+="<optgroup label='"+res[contT].nomeTipoPatologia+"'>";

              
             cont++;
              for(i in resp)  {
                comboPatologia.innerHTML+="<option value='"+resp[i].idPatologia+"'>"+resp[i].nomePatologia+"</option>"

                cont++;
              }
              comboPatologia.innerHTML+="  </optgroup>  ";
              comboPatologia.innerHTML+="<optgroup label=''>";
              document.getElementById("PatologiaId").selectedIndex=-1;

              contT++;
          }
          
          , error : function() { alert(JSON.stringify('error')); }
          
          });
          
      
        }
    }
    
    , error : function() { alert(JSON.stringify('error')); }
    
    });



    

    function split( val ) {
      return val.split( /;\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
    $( "#tarefas" )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.key === ";" || event.key=="Enter")
        {
        console.log("entrei");
          var terms = split( this.value );
          // remove the current input
          // add the selected item
          var checkT=availableTarefas.includes(this.value);
          if(checkT==false)
          {
            addPalavraTarefa(this.value);
          }

          var x = document.createElement("Chips");
          x.innerHTML=terms+"<span class='closebtn' onClick=this.parentElement.style.display='none'>x</span>";
          document.getElementById("areaTarefas").appendChild(x);
          this.value="";
          return false;
        }
        }),
     
      $( "#sintomas" )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.key === ";" || event.key=="Enter")
        {
        console.log("entrei");
          var terms = split( this.value );
          // remove the current input
          // add the selected item
          var check=availableSintomas.includes(this.value);
          if(check==false)
          {
            addPalavraSintoma(this.value);
          }
          var x = document.createElement("Chips");
          x.innerHTML=terms+"<span class='closebtn' onClick=this.parentElement.style.display='none'>x</span>";
          document.getElementById("areaSintomas").appendChild(x);
          this.value="";
          return false;
        }
        });
        document.getElementById("PatologiaId").selectedIndex=-1;

  })
 
  
  function addLinha()
  {
    if(contPat!=0)
    {
    var x = document.getElementById("patEscolhidas");
    if(x.innerHTML.indexOf("<tr><td></td><td></td><td></td></tr>")!=-1)
    {}
    else
    {
      x.innerHTML+="<tr><td></td><td></td><td></td></tr>";
    }
  }
  }
  
  function verResultados()
  {
    var arrId = [];
            $(':checkbox:checked').each(function(){
                 var id = $(this).closest('tr').attr('id');
                 arrId.push(id);
            })
            console.log(arrId);
    localStorage.setItem("ProcedimentosEscolhidos",arrId);
    window.location.href="prescricao.html";
  }

function preencherGenero()
  {
    var comboGenero=document.getElementById('GeneroComboId');
  $.ajax({
    url: "/GetGenero",
    method:"get",
    // sending in json
    contentType:"application/json",
    // receiving in json
    dataType:"json",
    success: function(res,status,jqXHR) {
        console.log(status);
        if (res.err) {
            console.log(JSON.stringify(res));
            return;
        }

        for(i in res)  {
          comboGenero.options[i]=new Option(res[i].nomeGenero,i);
          document.getElementById('GeneroComboId').selectedIndex='-1';

          console.log(res[i])
        }
    }
    
    , error : function() { alert(JSON.stringify('error')); }
    
    });
  }


  function preencherHabilitacao()
  {
    var comboHabilitacao=document.getElementById('Habilitacoes');
  $.ajax({
    url: "/GetHabilitacao",
    method:"get",
    // sending in json
    contentType:"application/json",
    // receiving in json
    dataType:"json",
    success: function(res,status,jqXHR) {
        console.log(status);
        if (res.err) {
            console.log(JSON.stringify(res));
            return;
        }

        for(i in res)  {
          comboHabilitacao.options[i]=new Option(res[i].nomeHabilitacao,i);
          document.getElementById('Habilitacoes').selectedIndex='-1';

          console.log(res[i])
        }
    }
    
    , error : function() { alert(JSON.stringify('error')); }
    
    });
  }

  function preencherLocalidade()
  {
 
    var comboLocalidade=document.getElementById('Localidade');
  $.ajax({
    url: "/GetLocalidade",
    method:"get",
    // sending in json
    contentType:"application/json",
    // receiving in json
    dataType:"json",
    success: function(res,status,jqXHR) {
        console.log(status);
        if (res.err) {
            console.log(JSON.stringify(res));
            return;
        }

        for(i in res)  {
       
          comboLocalidade.options[i]=new Option(res[i].nomeLocalidade,i);
          document.getElementById('Localidade').selectedIndex='-1';
        }
    }
    
    , error : function() { alert(JSON.stringify('error')); }
    
    });
  }

  function preencherSetor()
  {
    var comboSetor=document.getElementById('setorAtividade');
    $.ajax({
      url: "/GetSetorAtividade",
      method:"get",
      // sending in json
      contentType:"application/json",
      // receiving in json
      dataType:"json",
      success: function(res,status,jqXHR) {
          console.log(status);
          if (res.err) {
              console.log(JSON.stringify(res));
              return;
          }
  
          for(i in res)  {
         
            comboSetor.options[i]=new Option(res[i].nomeSetorAtividade,i);
            document.getElementById('setorAtividade').selectedIndex='-1';
          }
      }
      
      , error : function() { alert(JSON.stringify('error')); }
      
      });
  }

  function preencherFuncao()
  {
    var comboFuncao=document.getElementById('Funcao');
    $.ajax({
      url: "/GetFuncao",
      method:"get",
      // sending in json
      contentType:"application/json",
      // receiving in json
      dataType:"json",
      success: function(res,status,jqXHR) {
          console.log(status);
          if (res.err) {
              console.log(JSON.stringify(res));
              return;
          }
  
          for(i in res)  {
         
            comboFuncao.options[i]=new Option(res[i].nomeFuncao,i);
            document.getElementById('Funcao').selectedIndex='-1';
          }
      }
      
      , error : function() { alert(JSON.stringify('error')); }
      
      });
  }

  function preencherSintomas()
  {
    $.ajax({
      url: "/GetSintomas",
      method:"get",
      // sending in json
      contentType:"application/json",
      // receiving in json
      dataType:"json",
      success: function(res,status,jqXHR) {
          console.log(status);
          if (res.err) {
              console.log(JSON.stringify(res));
              return;
          }
  
          for(i in res)  {
            console.log(res);
            availableSintomas.push(res[i].nomeSintoma);
            
          }
          console.log(availableSintomas);
      }
      
      , error : function() { alert(JSON.stringify('error')); }
      
      });
  }

  function preencherTarefas()
  {
    $.ajax({
      url: "/GetTarefas",
      method:"get",
      // sending in json
      contentType:"application/json",
      // receiving in json
      dataType:"json",
      success: function(res,status,jqXHR) {
          console.log(status);
          if (res.err) {
              console.log(JSON.stringify(res));
              return;
          }
  
          for(i in res)  {
            console.log(res);
            availableTarefas.push(res[i].nomeTarefa);
            
          }
          console.log(availableSintomas);
      }
      
      , error : function() { alert(JSON.stringify('error')); }
      
      });
  }

  function addPalavraSintoma(sintoma)
  {
    $.ajax({
      url: "/NewSintoma/"+sintoma,
      method:"get",
      // sending in json
      contentType:"application/json",
      // receiving in json
      dataType:"json",
      success: function(res,status,jqXHR) {
          console.log(status);
      }
      
      , error : function() { alert(JSON.stringify('error')); }
      
      });
  }


  function addPalavraTarefa(tarefa)
  {
    $.ajax({
      url: "/NewTarefa/"+tarefa,
      method:"get",
      // sending in json
      contentType:"application/json",
      // receiving in json
      dataType:"json",
      success: function(res,status,jqXHR) {
          console.log(status);
      }
      
      , error : function() { alert(JSON.stringify('error')); }
      
      });
  }


  function listarSintomas()
  {
    $("#lsintomas").autocomplete( "search", "" );
  }

  function listarTarefas()
  {
    $("#ltarefas").autocomplete( "search", "" );

  }

  function adicionarPat(patEscolhida)
  {
    if(contPat==0)
    {
      document.getElementById("PatologiaId").remove(document.getElementById("PatologiaId").selectedIndex);
      $.ajax({
        url: "/GetSintoma/"+patEscolhida,
        method:"get",
        // sending in json
        contentType:"application/json",
        // receiving in json
        dataType:"json",
        success: function(res,status,jqXHR) {
          for(i in res)
          {
            var x = document.getElementById("patEscolhidas");
            x.innerHTML+="<tr><td>"+res[i].nomePatologia+"</td><td>"+res[i].descricaoPatologia+"</td><td>"+res[i].referenciaPatologia+"</td></tr>";
            console.log(res);
          }
          
        }
        
        , error : function() { alert(JSON.stringify('error')); }
        
        });
      console.log("isto metia");
      contPat++;
    }

    if(contPat!=0)
    {

    var x = document.getElementById("patEscolhidas");
    if(x.innerHTML.indexOf("<tr><td></td><td></td><td></td></tr>")!=-1)
    {
      
      document.getElementById("PatologiaId").remove(document.getElementById("PatologiaId").selectedIndex);

      contPat++;
      $.ajax({
        
        url: "/GetSintoma/"+patEscolhida,
        method:"get",
        // sending in json
        contentType:"application/json",
        // receiving in json
        dataType:"json",
        
        success: function(res,status,jqXHR) {
          for(i in res)
          {
            x.deleteRow(contPat);
            x.innerHTML+="<tr><td>"+res[i].nomePatologia+"</td><td>"+res[i].descricaoPatologia+"</td><td>"+res[i].referenciaPatologia+"</td></tr>";
            console.log(res);
            
          }
          
        }
        
        , error : function() { alert(JSON.stringify('error')); }
        
        });
      }
      
    }
    document.getElementById("PatologiaId").selectedIndex=-1;
  }
  

  function determinarPOP()
  {
    var tabela = document.getElementById("POP");
     tabela.style.display="block";

    var x=document.getElementById("ListaPOP");
    $.ajax({
      url: "/GetProcedimentos",
      method:"get",
      // sending in json
      contentType:"application/json",
      // receiving in json
      dataType:"json",
      success: function(res,status,jqXHR) {
          console.log(status);
          if (res.err) {
              console.log(JSON.stringify(res));
              return;
          }
  
          for(i in res)  {
            console.log(res);
            x.innerHTML+="<tr id="+res[i].idProcedimento+"><td></td><td>"+res[i].nomeProcedimento+"</td><td>"+res[i].ColmatacaoTotal+" %</td><td>"+res[i].PrecoTotal+" €</td><td><input type='checkbox'></td></tr> "      
          }
         
      }
      
      , error : function() { alert(JSON.stringify('error')); }
      
      });
  }

  function abrirMembros()
  {
    $('.hover_bkgr_fricc').show();

  }

  function fecharPop(){
    console.log("boas");
    $('.hover_bkgr_fricc').hide();
  }