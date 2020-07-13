// instancia de clase VUE
var recursosSeccion = new Vue({
  el: "#recursosResultado",
  data: {
    resultados: [],
    tipo: "",
  },
  methods: {
    cargarInformacionContacto: function () {
      this.tipo = "contactos";
      cargarContactosFetch().then((data) => {
        this.resultados = JSON.parse(data);
      });
    },
    cargarInformacionProductos: function () {
      this.tipo = "productos";
      cargarProductosFetch().then((data) => {
        this.resultados = JSON.parse(data);
      });
    },
  },
});

// funcion asincrona que conecta con servidor express
async function cargarContactosFetch() {
  let response = await fetch("http://localhost:3000/contactos", {
    method: "GET",
  });
  var data = await response.text();
  return data;
}

// funcion asincrona que conecta con servidor express
async function cargarProductosFetch() {
  let response = await fetch("http://localhost:3000/productos", {
    method: "GET",
  });
  var data = await response.text();
  return data;
}

function tipoConsulta(valor) {
  switch (valor) {
    case "productos":
        recursosSeccion.cargarInformacionProductos();
      break;
    case "contactos":
        recursosSeccion.cargarInformacionContacto();
      break;
    default:
      break;
  }
}