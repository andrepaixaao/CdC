$(document).ready(function(){
  preencherGenero();
  preencherHabilitacao();
  preencherLocalidade();
  var availableTarefas = [
      "Andar",
      "Correr",
      "Tempo em pé",
      "Pegar no rato",
      "Movimentar o rato",
      "Concentração e foco no monitor"
    ];
  
  var availableSintomas= [
      "Dor nos Dedos","Dores nos Membros","Movimentação reduzida","Fadiga Muscular","Formigueiro","Inflamação",
      "Sensibilidade Alterada","Stress","Dores de cabeça"
  
  ];
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
        
          var x = document.createElement("Chips");
          x.innerHTML=terms+"<span class='closebtn' onClick=this.parentElement.style.display='none'>x</span>";
          document.getElementById("areaSintomas").appendChild(x);
          this.value="";
          return false;
        }
        }),
     

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
  })
  function determinarPOP()
  {
      var x = document.getElementById("POP");
      x.style.display="block";
  }
  
  function addLinha()
  {
      console.log("teste");
      var x = document.getElementById("patEscolhidas")
      x.innerHTML+="<tr><td></td><td></td><td></td></tr>";
  }
  
  function verResultados()
  {
    window.location.href="prescricao.html";
  }

  function listarSintomas()
  {
    $("#lsintomas").autocomplete( "search", "" );


  }

  function listarTarefas()
  {
    $("#ltarefas").autocomplete( "search", "" );

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
 
    document.getElementById('Localidade').selectedIndex='-1';
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
          var comboLocalidade=document.getElementById('Localidade');
        }
    }
    
    , error : function() { alert(JSON.stringify('error')); }
    
    });
  }