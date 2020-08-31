// instancia de clase VUE
var recursosSeccion = new Vue({
  el: "#pas3",
  data: {
    resultados: [],
    tipo: "",
  },
  methods: {
    cargarInformacionContacto: function () {
      this.tipo = "administrarContactos"
      cargarContactosFetch().then((data) => {
        this.resultados = JSON.parse(data)
      })
    },
    cargarInformacionProductos: function () {
      this.tipo = "administrarProductos"
      cargarProductosFetch().then((data) => {
        this.resultados = JSON.parse(data)
      })
    },
    cargarInformacionNoticias: function () {
      this.tipo = "administrarNoticias"
      cargarNoticiasFetch().then((data) => {
        this.resultados = JSON.parse(data)
        console.log(this.resultados);
      })
    }
  }
})

async function cargarContactosFetch() {
  let response = await fetch("http://localhost:3000/contactos", {
    method: "GET",
  })
  var data = await response.text()
  return data
}

async function cargarProductosFetch() {
  let response = await fetch("http://localhost:3000/productos", {
    method: "GET",
  })
  var data = await response.text()
  return data
}

async function cargarNoticiasFetch() {
  let response = await fetch("http://localhost:3000/new/todos", {
    method: "GET",
  })
  var data = await response.text()
  return data
}

function tipoConsulta(valor) {
  document.getElementById("recursosResultado").classList.remove('d-none')
  switch (valor) {
    case "administrarProductos":
      recursosSeccion.cargarInformacionProductos()
      break
    case "administrarContactos":
      recursosSeccion.cargarInformacionContacto()
      break
    case "administrarNoticias":
      recursosSeccion.cargarInformacionNoticias()
      break
    default:
      break
  }
}
