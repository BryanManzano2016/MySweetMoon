// instancia de clase VUE
const queryUrl = window.location.search;
const urlParametros = new URLSearchParams(queryUrl);
 
var noticiaSeccion = new Vue({
    el: "#noticiaResultado",
    data: {
        resultados: [],
    },
    methods: {
        cargarNoticia: function () {
            getFetchObjeto("http://localhost:3000/new/" + urlParametros.get("id"),
             {}).then(data => {
                this.resultados = [data] 
                console.log( data );
            });
        },
    },
}); 

//v-bind:href="elem.enlace" 
noticiaSeccion.cargarNoticia()