var resultadosProductos;

sessionStorage.setItem("productoBuscado", "");

function obtenerProductosServidor() {
  // let resultado = sessionStorage.getItem("productoBuscado");
  let resultado = "Torta";
  if (resultado != "") {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/productos/" + resultado,
      success: function (res) {
        resultadosProductos = res;
        console.log(resultadosProductos);
        new Vue({
          el: "#productosResultado",
          data: {
            resultados: resultadosProductos,
          },
        });
      },
      dataType: "json",
    });
  }
}

obtenerProductosServidor();
