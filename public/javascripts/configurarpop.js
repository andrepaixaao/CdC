function abrirMembros() {
  $('.hover_bkgr_fricc').show();

}

function fecharPop() {
  
  $('.hover_bkgr_fricc').hide();
}

$(document).ready(function () {

    $('table').on('click', '#apagarlinha', function(e){
      $(this).closest('tr').remove()
    
   })  

})
