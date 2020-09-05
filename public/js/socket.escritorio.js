// Comando para establecer comunicacion con el server
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

//console.log(searchParams.has('escritorio'))

if(!searchParams.has('escritorio')){
   window.location = 'index.html';

   throw new Error('Es necesario seleccionar un escritorio');
}

var escritorio = searchParams.get('escritorio');
var label = $('small')
//console.log(escritorio);

$('h1').text(`Escritorio ${escritorio}`);


///listener del boton


$('button').on('click', function(){

   socket.emit('atenderTicket',{escritorio: escritorio}, function(respuesta){
      console.log(respuesta)

      if(respuesta === 'No hay tickets'){
         label.text(respuesta);
         alert(respuesta);
         return;
      }

      label.text('Ticket '+respuesta.numero);
   })
   
});



