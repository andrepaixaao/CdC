$(document).ready(function(){
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
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
    $( "#tarefas" )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
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
          this.value="";
          return false;
        }
      });
      $( "#sintomas" )
      // don't navigate away from the field on tab when selecting an item
      .on( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
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
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });

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
          terms.push( "" );
          var sintomas=document.getElementById('sintomas');
          sintomas.value =sintomas.value +terms.join( ", " );
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
          terms.push( "" );
          var tarefas=document.getElementById('tarefas');
          tarefas.value =tarefas.value +terms.join( ", " );
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

