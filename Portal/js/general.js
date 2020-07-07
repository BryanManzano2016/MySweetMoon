$( document ).ready(function() {
    $("#buscadorInterno").submit(function (e){
        e.preventDefault()
        var win = window.open("productos.html", '_blank');
        win.focus();
        sessionStorage.setItem("productoBuscado", $("#busquedaTexto").val())

    })
})
