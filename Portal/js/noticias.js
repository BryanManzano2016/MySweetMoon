
// instancia de clase VUE
var noticiasSeccion = new Vue({
    el: "#noticiasResultado",
    data: {
        resultados: [],
    },
    methods: {
        cargarNoticias: function () {
            getFetchObjeto("http://localhost:3000/new/todos", {}).then(data => {
                this.resultados = data
                console.log(data)
            });
        },
    },
}); 

//v-bind:href="elem.enlace"
noticiasSeccion.cargarNoticias() 