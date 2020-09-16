
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
    processForm: function () {
      console.log('"name":' + this.name)

      await fetch(
        'http://localhost:3000/contacto/send',
        {
          method: "POST",
          body: JSON.stringify({ name: this.name, lastname: this.lastname, phone: this.phone, email: this.email, date: this.date, message: this.message }),
          headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") }
        }
      ).then(response => {
        alert('Mensaje Enviado!');
        this.eraseInformation();
        console.log(response)
        console.log(response.data)
      })
        .catch(error => {
          alert('No se pudo enviar el mensaje!');
        });

    },

    eraseInformation: function () {
      this.name = ''
      this.lastname = ''
      this.phone = ''
      this.email = ''
      this.date = ''
      this.message = ''
    }
  }
});