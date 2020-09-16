
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
      
      axios.post('http://localhost:3000/contacto/send',
      {name : this.name, lastname: this.lastname, phone: this.phone, email: this.email, date: this.date, message: this.message})
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