$("#buscadorInterno").submit(function (e){
    e.preventDefault();

    sessionStorage.setItem("productoBuscado", $("#busquedaTexto").val());
    /* 
    var win = window.open("productos.html", '_blank');
    win.focus();
     */
})
