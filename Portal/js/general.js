$("#buscadorInterno").submit(function (e){
    console.log(1);
    e.preventDefault();

    sessionStorage.setItem("productoBuscado", $("#busquedaTexto").val());
    var win = window.open("productos.html", '_blank');
    win.focus();
})
