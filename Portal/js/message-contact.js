/*

const contactForm = document.getElementById('contact-form');
const nameInput  = contactForm.querySelector('input[name=name]');
const lastnameInput = contactForm.querySelector('input[name=lastname]');
const phoneInput = contactForm.querySelector('input[name=phone]');
const emailInput = contactForm.querySelector('input[name=mail]');
const dateInput = contactForm.querySelector('input[name=date]');
const messageInput = contactForm.querySelector('textarea[name=message]');

contactForm.addEventListener('submit', processContactForm);
function processContactForm(e) {
  e.preventDefault();

  
  const name  = nameInput.value;
  const lastname = lastnameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const date = dateInput.value;
  const message = messageInput.value;

  console.log({ name, lastname, email, phone, date,message });

  // form processing here
}*/


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
      
      axios.post('http://localhost:3000/contactos',
      {nombre : this.name, apellido: this.lastname, telefono: this.phone, correo: this.email, fecha: this.date, mensaje: this.message})
      .then(response => {
        alert('Mensaje Enviado!');
        //this.eraseInformation();
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