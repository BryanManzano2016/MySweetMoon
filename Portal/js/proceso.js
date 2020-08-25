var contenidoProceso = new Vue({
  el: "#content_process",
  data: {
    resultados: [],
    tipo: "",
  },
  methods: {
    clickActions: function (id){
      display_modal(this.tipo, id, true);
    },
    cargarInformacion: function () {
      cargarContenidoFetch().then((data) => {
        this.resultados = [];

        for (let ing of data) {
          if (this.tipo == ing.tipo) {
            this.resultados.push(ing);
          }
        }
      });
    }
  }
});

// funcion asincrona que conecta con servidor express
async function cargarContenidoFetch() {
  let response = await fetch("http://localhost:3000/ingrediente", {
    method: "GET"
  });
  var data = await response.json();
  return data;
}

async function asignarPaso(valor) {
  contenidoProceso.tipo = valor;
  await contenidoProceso.cargarInformacion();
}

let base_color = (btn) => {
  let buttons = document.getElementsByClassName("step-trigger");
  for (let button of buttons) {
    button.classList.remove("active");
  }
  btn.classList.add('active');
}

let buttons = document.getElementsByClassName("step-trigger");

for (let btn of buttons) {
  btn.addEventListener("click", function (e) {
    document.getElementById('recursos').classList.remove('d-none');
    base_color(this);
  });
}