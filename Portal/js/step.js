var UserId = "1";
var stepperseccion = new Vue({
  el: "#torta",
  data: {
      resultados: [],
  },
  methods: {
      cargarInformacionGaleria: function () {
          cargarContenidoFetch().then((data) => {
              this.resultados = [];
              for (let elemento of data) {
                  this.resultados.push(elemento);
              }
          });
      },
      clickActions: function (id) {
          display_edit_quote(id);
      },
      deleteQuote: function (id, name) {
          deleteQuote(id);
      }
  },
});

async function cargarContenidoFetch() {
  let response = await fetch("http://localhost:3000/quote/" + UserId, {
      method: "GET"
  });
  var data = await response.json();
  return data;
};

async function deleteQuote(id) {
  fetch('http://localhost:3000/quote/' + id, {
      method: 'DELETE'
  }).then((res) => {
      if (res.status == 404) {
          throw res.status;
      }
      console.log(res.status);
      console.log(res);
      alert('La cotización fue eliminada exitosamente!');
      stepperseccion.cargarInformacionGaleria();
  }).catch(error => {
      console.log("y se cayó :c");
      alert('No se pudo eliminar la cotización!');
  });
}

async function display_edit_quote(id) {
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
  modal.style.overflow = "auto";

  let response = await fetch("http://localhost:3000/quote/id/" + id, {
      method: "GET"
  });
  var data = await response.json();
  let nombre = "value='" + data[0].nombre + "'";
  let title = "Editar cotización '" + data[0].nombre + "'";
  let llamada = "putQuote(" + id + ")";

  modal.innerHTML = `<div class="modal-content col-lg-6 col-sm-10">
  <div class="d-flex justify-content-end">
  <span class="close" onclick="closeModal()">&times;</span>
  </div>
  <p class="title">${title}</p>
    <form id="form-cambios">
    <div class="input row">
      <label class="col-12" for="titulo">Nombre:</label> 
      <input class="col-12" type="text" id="titulo" name="titulo" ${nombre} required>
    </div>
    <div class="col-12 d-flex justify-content-end">
      <input id="guardar" class="btn btn-primary send-btn" type="button" onclick="${llamada}" value="Guardar">
      <input id="cancelar" class="btn btn-secondary" type="button" onclick="closeModal()" value="Cancelar">
      <input id="btn-submit" type="submit" class="d-none">
    </div>
    </form> </div>`;
}

async function putQuote(id){
  let nombre = document.getElementById("titulo").value;

  fetch('http://localhost:3000/quote/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        nombre: nombre}),
      headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") }
  }).then((res) => {
      if (res.status == 404) {
          throw res.status;
      }
      console.log(res.status);
      console.log(res);
      alert('Se actualizó la cotización exitosamente!');
      stepperseccion.cargarInformacionGaleria();
  }).catch(error => {
      console.log("y se cayó :c");
      alert('No se pudo actualizar la cotización!');
  });
}

async function restaurarQuote() {
  fetch('http://localhost:3000/quote/restore', {
      method: 'PUT'
  }).then((res) => {
      if (res.status == 404) {
          throw res.status;
      }
      console.log(res.status);
      console.log(res);
      alert('Las cotizaciones eliminadas fueron restauradas exitosamente!');
      stepperseccion.cargarInformacionGaleria();
  }).catch(error => {
      console.log("y se cayó :c");
      alert('No se pudo restaurar la cotización!');
  });
}

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var form = document.getElementById("regForm");

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Enviar";
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    console.log("enviando..");
    sendQuote();
    currentTab = 0;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

async function sendQuote(){
  await fetch(
    'http://localhost:3000/quote',
    {
      method: "POST",
      body: JSON.stringify({
        tamaño: form.elements[0].value, 
        masa: form.elements[1].value, 
        relleno: form.elements[2].value, 
        cubierta: form.elements[3].value, 
        topping: form.elements[4].value, 
        id: 1}),
      headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") }
    }
  ).then(response => {
    alert('Cotización Guardada!');
    stepperseccion.cargarInformacionGaleria();
  }).catch(error => {
      alert(error);
    });
}


stepperseccion.cargarInformacionGaleria();