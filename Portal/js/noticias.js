
// instancia de clase VUE
var noticiasSeccion = new Vue({
    el: "#noticiasResultado",
    data: {
        resultados: [],
    },
    methods: {
        cargarNoticias: function () {
            getFetchObjeto("http://localhost:3000/new/all", {}).then(data => {
                this.resultados = data 
            });
        },
    },
}); 

//v-bind:href="elem.enlace"
noticiasSeccion.cargarNoticias() 