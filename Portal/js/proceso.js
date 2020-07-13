let btn_size = document.getElementById("btn_size");
let size_content = document.getElementById("size_content");

let btn_mass = document.getElementById("btn_mass");
let mass_content = document.getElementById("mass_content");

let btn_relleno = document.getElementById("btn_relleno");
let relleno_content = document.getElementById("relleno_content");

let btn_cover = document.getElementById("btn_cover");
let cover_content = document.getElementById("cover_content");

let btn_toping = document.getElementById("btn_toping");
let toping_content = document.getElementById("toping_content");


var contenidoProceso = new Vue({
    el: "#content_process",
    data: {
      resultados: [],
      tipo: "",
    },
    methods: {
      cargarInformacion: function () {
        cargarContenidoFetch().then((data) => {
          var result = JSON.parse(data);
          switch (this.tipo) {
            case "size":
               this.resultados = result[0].sizes;
                break;
            case "mass":
                this.resultados = result[0].masas;
                break;
            case "relleno":
                this.resultados = result[0].rellenos;
                break;
            case "cubierta":
                this.resultados = result[0].cubiertas;
                break;
            case "toping":
                this.resultados = result[0].topings;
                break;
          }
        });
      }
    }
  });
  
  // funcion asincrona que conecta con servidor express
  async function cargarContenidoFetch() {
    let response = await fetch("http://localhost:3000/pasos", {
      method: "GET"
    });
    var data = await response.text();
    return data;
  }
  
  function asignarPaso(valor) {
        contenidoProceso.tipo = valor;
        contenidoProceso.cargarInformacion();
  }
  


let base_color = (btn) => {
    let buttons = document.getElementsByClassName("step-trigger");
    for(let button of buttons){
        button.removeAttribute("class");
        button.setAttribute("Class", "step-trigger")
    }

    btn.setAttribute('class', btn.getAttribute('class') + " active");
}

let buttons = document.getElementsByClassName("step-trigger");

for(let btn of buttons){
  btn.addEventListener("click", function(e) {
    base_color(this); 
  });
}