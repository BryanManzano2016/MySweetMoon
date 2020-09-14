$("#formularioNoticia").submit(function (e) {
  e.preventDefault()
  guardarNoticia()
})
$("#formularioProducto").submit(function (e) {
  e.preventDefault()
  guardarProducto()
})
$("#botonAgregarNoticia").click(function (e) {
  document.getElementById('formularioNoticia').reset()
  $("#idNoticia").val("")
})
function reiniciarFormularioProducto() {
  document.getElementById('formularioProducto').reset()
  $("#idProducto").val("")
}
function reiniciarFormularioNoticia() {
  document.getElementById('formularioNoticia').reset()
  $("#idNoticia").val("")
}

$("#productosReporteSelect").change(function (e) {
  recursosSeccion.cargarProductosHistorial()
})
function clickMe(args) {
  console.log(args);
}

// instancia de clase VUE
var recursosSeccion = new Vue({
  el: "#recursosResultado",
  data: {
    resultados: [],
    reportes: [],
    tipo: "",
    productoCompradoSeleccion: "",
    elementoSeleccionado: {}
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
      })
    },
    cargarReporteProductos: function () {
      this.tipo = "reporteVentas"
      cargarProductoDisponiblesFetch().then((data) => {
        this.resultados = JSON.parse(data)
      })
    },
    cargarProductosHistorial: function () {
      if (this.productoCompradoSeleccion != "") {
        cargarProductoHistorialFetch(this.productoCompradoSeleccion).then((data) => {
          this.reportes = JSON.parse(data)
        })
      }
    },
    seleccionarElemento: function (elemento) {
      this.elementoSeleccionado = elemento
      switch (this.tipo) {
        case "administrarProductos":
          $("#idProducto").val(elemento.id)
          $("#nombreProducto").val(elemento.nombre)
          $("#caracteristicasProducto").val(elemento.caracteristicas)
          break
        case "administrarContactos":


          break
        case "administrarNoticias":
          $("#tituloNoticia").val(elemento.titulo)
          $("#subtituloNoticia").val(elemento.subtitulo)
          $("#contenidoNoticia").val(elemento.contenido)
          $("#idNoticia").val(elemento.id)
          break
        default:
          break
      }
    },
    eliminarElemento: function (elemento = {}, tipo = "") {
      switch (tipo) {
        case "producto":
          deleteFetch("http://localhost:3000/product/delete/" + elemento.id).then((res) => {
            recursosSeccion.cargarInformacionProductos()
          })
          break
        case "noticia":
          deleteFetch("http://localhost:3000/new/delete/" + elemento.id).then((res) => {
            recursosSeccion.cargarInformacionNoticias()
          })
          break
        default:
          break
      }
    },
    clickMe: function (params) {
      console.log(params);
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
  let response = await fetch("http://localhost:3000/product/all", {
    method: "GET",
  })
  var data = await response.text()
  return data
}

async function cargarNoticiasFetch() {
  let response = await fetch("http://localhost:3000/new/all", {
    method: "GET",
  })
  var data = await response.text()
  return data
}

async function cargarProductoDisponiblesFetch() {
  let response = await fetch("http://localhost:3000/quote/all", {
    method: "GET",
  })
  var data = await response.text()
  return data
}

async function cargarProductoHistorialFetch(id = "") {
  let response = await fetch("http://localhost:3000/quote/report/" + id, {
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
    case "reporteVentas":
      recursosSeccion.cargarReporteProductos()
      break
    default:
      break
  }
}

function limpiarFormularioNoticias() {
  ocultarModal()
  $('#modalNoticia').modal('hide')
  document.getElementById('formularioNoticia').reset()
  recursosSeccion.cargarInformacionNoticias()
}

function limpiarFormularioProductos() {
  ocultarModal()
  $('#modalProducto').modal('hide')
  document.getElementById('formularioProducto').reset()
  recursosSeccion.cargarInformacionProductos()
}

function ocultarModal() {
  $('body').removeClass('modal-open')
  $(".modal-backdrop").remove()
}

function guardarNoticia() {
  let objetoGuardar = {
    titulo: $("#tituloNoticia").val(),
    subtitulo: $("#subtituloNoticia").val(),
    contenido: $("#contenidoNoticia").val(),
    id: $("#idNoticia").val(),
    fecha: Date(),
    userId: 1,
    pictureId: 1
  }
  if ($("#idNoticia").val() == "") {
    storeFetch("http://localhost:3000/new/save", objetoGuardar).then((res) => {
      limpiarFormularioNoticias()
    })
  } else {
    putFetch("http://localhost:3000/new/update", objetoGuardar).then((res) => {
      console.log(res)
      limpiarFormularioNoticias()
    })
  }
}

function guardarProducto() {
  let objetoGuardar = {
    nombre: $("#nombreProducto").val(),
    caracteristicas: $("#caracteristicasProducto").val(),
    id: $("#idProducto").val(),
    pictureId: 1
  }
  if ($("#idProducto").val() == "") {
    storeFetch("http://localhost:3000/product/save", objetoGuardar).then((res) => {
      limpiarFormularioProductos()
    })
  } else {
    putFetch("http://localhost:3000/product/update", objetoGuardar).then((res) => {
      limpiarFormularioProductos()
    })
  }
}

