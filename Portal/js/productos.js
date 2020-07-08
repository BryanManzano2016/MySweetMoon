var resultadosProductos = null;
/* 
new Vue({
  el: "#productosResultado",
  data: {
    resultados: resultadosProductos,
  },
});

function obtenerProductosServidor() {
  let resultado = sessionStorage.getItem("productoBuscado");
  alert(resultado)
  if (resultado != "") {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/productos/" + resultado,
      success: function (res) {
        resultadosProductos = res;
      },
      dataType: "json",
    });
  }
}

obtenerProductosServidor();
 */
var app = new Vue({
  el: "#productosResultado",
  data() {
    return {
      resultados: []
    };
  },
  created() {
    // let resultado = sessionStorage.getItem("productoBuscado");
    // if (resultado != "") {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/productos/" + "or",
      success: function (res) {
        console.log(this.resultados);
        this.resultados = res;
        console.log(this.resultados);
      },
      dataType: "json",
    });
    // }
  },
});

var app2 = new Vue({
  el: "#productosResultado2",
  data() {
    return {
      resultados: null
    };
  }, 
  methods: {
    cargarProductos(){
      $.ajax({
        type: "GET",
        url: "http://localhost:3000/productos/" + "or",
        success: function (res) {
          console.log(this.resultados);
          this.resultados = res;
          console.log(this.resultados);
        },
        dataType: "json",
      });
    }
  }
});

/* sessionStorage.setItem("productoBuscado", ""); */
