
const fs = require('fs');

class Ticket {
   constructor(numero, escritorio) {

      this.numero = numero;
      this.escritorio = escritorio;





   }
}




class TicketControl {

   constructor() {

      this.ultimo = 0;
      this.hoy = new Date().getDate();
      //tickets que no han sido atendidos
      this.tickets = [];
      this.ultimos4 = [];



      //para requerir un archivo .json se puede hacer directamente
      let data = require('../data/data.json');

      if (data.hoy === this.hoy) {
         this.ultimo = data.ultimo;
         this.tickets = data.tickets;
         this.ultimos4 = data.ultimos4;
      } else {
         this.reiniciarConteo();
      }
   }

   siguienteTicket() {
      // += es lo mismo que decir this.ultimo + 1    
      this.ultimo += 1;

      let ticket = new Ticket(this.ultimo, null);
      this.tickets.push(ticket);

      this.grabarArchivo();

      return `Ticket: ${this.ultimo}`;

   }

   getUltimoTicket() {
      return `Ticket: ${this.ultimo}`;
   }
   getUltimos4() {
      return this.ultimos4;
   }

   atenderTicket(escritorio) {
      this.escritorio = escritorio;

      if (this.tickets.length === 0) {
         return 'No hay tickets';
      }

      let numeroTicket = this.tickets[0].numero;

      //eliminar el primer elemento del array con la funcion shift
      this.tickets.shift();

      let atenderTicket = new Ticket(numeroTicket, escritorio);
      //poner como primer elemento con la funcion unshift
      this.ultimos4.unshift(atenderTicket);

      if (this.ultimos4.length > 4){
         this.ultimos4.splice(-1,1); //borrar el ultimo elemento del array
      }

      /* console.log('Ultimos 4');
      console.log(this.ultimos4);
 */
      this.grabarArchivo();
      return atenderTicket;
      
   }


   reiniciarConteo() {

      this.ultimo = 0;
      this.tickets = [];
      this.ultimos4 = [];
      this.grabarArchivo();


   }

   grabarArchivo() {
      let jsonData = {
         ultimo: this.ultimo,
         hoy: this.hoy,
         tickets: this.tickets,
         ultimos4: this.ultimos4
      };

      let jsonDataString = JSON.stringify(jsonData);

      fs.writeFileSync('./server/data/data.json', jsonDataString);



   }



}


module.exports = {
   TicketControl
}