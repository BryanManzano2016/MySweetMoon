$("#buscadorInterno").submit(function (e){
  e.preventDefault();
})

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

async function cargarProductosFetch() {
  var busqueda = $("#busquedaTexto").val()
  let response = await fetch(
    "http://localhost:3000/productos/" + busqueda,
    { method: "GET" }
  );
  var data = await response.text();
  return data;
}

$("#buscar").click(function (){
  productosSeccion.cargarProductos();
});