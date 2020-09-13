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
  $("#idNoticia").val("");
});
function reiniciarFormularioProducto() { 
  document.getElementById('formularioProducto').reset()
  $("#idProducto").val("")
}
function reiniciarFormularioNoticia() { 
  document.getElementById('formularioNoticia').reset()
  $("#idNoticia").val("")
}
document.getElementById('formularioProducto').reset()
// instancia de clase VUE
var recursosSeccion = new Vue({
  el: "#recursosResultado",
  data: {
    resultados: [],
    tipo: "",
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

 /*      
      cargarProductosFetch().then((data) => {
        console.log(data);
        this.resultados = JSON.parse(data)
      })
 */
    },
    cargarInformacionNoticias: function () {
      this.tipo = "administrarNoticias"
      cargarNoticiasFetch().then((data) => {
        this.resultados = JSON.parse(data)
      })
    },
    seleccionarElemento: function (elemento) {
      this.elementoSeleccionado = elemento
      switch (this.tipo) {
        case "administrarProductos":


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
    eliminarElemento: function (elemento) {
      deleteFetch("http://localhost:3000/new/borrarNoticia/" + elemento.id).then((res) => {
        recursosSeccion.cargarInformacionNoticias()
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

function guardarNoticia() {
  let objetoNoticiasGuardar = {
    titulo: $("#tituloNoticia").val(),
    subtitulo: $("#subtituloNoticia").val(),
    contenido: $("#contenidoNoticia").val(),
    id: $("#idNoticia").val(),
    fecha: Date(),
    userId: 1,
    pictureId: 1
  }
  if ($("#idNoticia").val() == "") {
    storeFetch("http://localhost:3000/new/guardarNoticia", objetoNoticiasGuardar).then((res) => {
      limpiarFormularioNoticias()
    })
  } else {
    putFetch("http://localhost:3000/new/modificarNoticia", objetoNoticiasGuardar).then((res) => {
      limpiarFormularioNoticias()
    })
  }
}

function limpiarFormularioNoticias() {
  $('body').removeClass('modal-open')
  $(".modal-backdrop").remove()
  $('.modal-backdrop').remove()
  $('#modalNoticia').modal('hide')
  document.getElementById('formularioNoticia').reset()
  recursosSeccion.cargarInformacionNoticias()
}

function guardarProducto() {

}