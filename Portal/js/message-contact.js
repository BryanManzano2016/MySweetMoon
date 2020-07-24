
const app = new Vue({
  el: '#contact',

  // our data
  data: {
    name: '',
    lastname: '',
    phone: '',
    email: '',
    date: '',
    message: '',
    responseData: ''
  },

  // our methods
  methods: {
    processForm: function() {
      console.log('{"name":' + this.name)
      
      axios.post('https://servermysweetmoon.herokuapp.com/contactos',
      {nombre : this.name, apellido: this.lastname, telefono: this.phone, correo: this.email, fecha: this.date, mensaje: this.message})
      .then(response => {
        alert('Mensaje Enviado!');
        this.eraseInformation();
        console.log(response)
        console.log(response.data)
      })
      .catch(error => {
        alert('No se pudo enviar el mensaje!');
      });
    },

    eraseInformation: function() {
      this.name= ''
      this.lastname= ''
      this.phone= ''
      this.email= ''
      this.date= ''
      this.message= ''
    }
  }
});