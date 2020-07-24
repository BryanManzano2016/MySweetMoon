// instancia de clase VUE
var productosSeccion = new Vue({
  el: "#productosResultado",
  data: {
    resultados: [],
  },
  methods: {
    cargarProductos: function () {    
      cargarProductosFetch().then( data => {
        this.resultados = JSON.parse(data)
      } );
    },
  },
});

// funcion asincrona que conecta con servidor express
async function cargarProductosFetch() {
  var busqueda = $("#busquedaTexto").val() == "" ? "" : "/" + $("#busquedaTexto").val()
  let response = await fetch(
    "http://localhost:3000/productos" + busqueda,
    { method: "GET" }
  );
  var data = await response.text();
  return data;
}

/* 
  Jquery para evento click, el cual usa la instancia de Vue y 
  ejecuta un metodo de este ultimo 
*/
$("#buscarBoton").click(function (){
  productosSeccion.cargarProductos();
});