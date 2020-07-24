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
       button.classList.remove("active");
    }
    btn.classList.add('active');
}

let buttons = document.getElementsByClassName("step-trigger");

for(let btn of buttons){
  btn.addEventListener("click", function(e) {
    document.getElementById('recursos').classList.remove('d-none');
    base_color(this); 
  });
}