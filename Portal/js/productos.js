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
  let response = await fetch(
    "http://localhost:3000/product/all",
    { method: "GET", headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") }}
  );
  var data = await response.text();
  return data;
}
 
productosSeccion.cargarProductos();