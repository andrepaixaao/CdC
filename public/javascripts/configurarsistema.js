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

  $('table').on('click', '#apagartextopre', function(e){
    console.log("oi");
   $(this).closest("tr").find('#sintomapretab').val("");
 })

 
 $('table').on('click', '#apagartextosint', function(e){
  console.log("oi");
 $(this).closest("tr").find('#sintomatab').val("");
})



$('table').on('click', '#apagartextotar', function(e){
  console.log("oi");
 $(this).closest("tr").find('#tarefatab').val("");
})

$('table').on('click', '#pintar', function(e){
  if($(this). is(":checked")){
$(this).closest("tr").find("#tab").css('background-color','#99FF99');
 $(this).closest("tr").find("#tab1").css('background-color','#99FF99');
 $(this).closest("tr").find("#tab2").css('background-color','#99FF99');
 $(this).closest("tr").find("#tab3").css('background-color','#99FF99');
 $(this).closest("tr").find("#tab4").css('background-color','#99FF99');
 $(this).closest("tr").find("#tab5").css('background-color','#99FF99');
 $(this).closest("tr").find("#tab6").css('background-color','#99FF99');
 $(this).closest("tr").find("#tab7").css('background-color','#99FF99');
 $(this).closest("tr").find('#tarefatab').css('background-color','#99FF99');
 $(this).closest("tr").find('#sintomatab').css('background-color','#99FF99');
 $(this).closest("tr").find('#sintomapretab').css('background-color','#99FF99');
 $(this).closest("tr").find('#tabpat').css('background-color','#99FF99');
  }
  else
  {
    $(this).closest("tr").find("#tab").css('background-color','white');
 $(this).closest("tr").find("#tab1").css('background-color','white');
 $(this).closest("tr").find("#tab2").css('background-color','white');
 $(this).closest("tr").find("#tab3").css('background-color','white');
 $(this).closest("tr").find("#tab4").css('background-color','white');
 $(this).closest("tr").find("#tab5").css('background-color','white');
 $(this).closest("tr").find("#tab6").css('background-color','white');
 $(this).closest("tr").find("#tab7").css('background-color','white');
 $(this).closest("tr").find('#tarefatab').css('background-color','white');
 $(this).closest("tr").find('#sintomatab').css('background-color','white');
 $(this).closest("tr").find('#sintomapretab').css('background-color','white');
 $(this).closest("tr").find('#tabpat').css('background-color','white');
  }


})



})
