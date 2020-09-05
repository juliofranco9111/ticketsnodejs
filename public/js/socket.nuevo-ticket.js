


// Comando para establecer comunicacion con el server
var socket = io();

var label = $('#lblNuevoTicket');


//saber cuando el servidor está online
socket.on('connect', function () {
   console.log('Connected on server');
   

});

//saber cuando se desconecta
socket.on('disconnect', function () {
   console.log('Server connection fail');
});

socket.on('estadoActual',function(mensaje){
   label.text(mensaje.actual);
})



$('button').on('click', function(){

   socket.emit('siguienteTicket',null, function(siguienteTicket){
      label.text(siguienteTicket);
   });
   //console.log('click')
})