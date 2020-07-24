var modoUsuario;

var navOpcionesCliente = new Vue({
  el: "#navbar",
  data: {
    enlacesUsuario: [
      { enlace: "index.html", texto: "Inicio"},
      { enlace: "about.html", texto: "Nosotros" },
      { enlace: "productos.html", texto: "Productos" },
      { enlace: "pricing.html", texto: "Crea tu torta" },
      { enlace: "blog.html", texto: "Noticias" },
      { enlace: "contact.html", texto: "Contacto" },
      { enlace: "team.html", texto: "Equipo" }
    ],
    enlacesAdmin: [
        { enlace: "panel-grafico.html", texto: "Graficos" },
        { enlace: "procesos.html", texto: "Procesos" },
        { enlace: "recursos.html", texto: "Panel de recursos"}
      ],
    usuario: sessionStorage.getItem("modoUsuario")
  },
});
 
const footer = `
    <div class="container">
        <div class="row d-flex">
            <div class="col-md">
                <div class="ftco-footer-widget mb-4">
                    <h2 class="ftco-heading-2">MySweetMoon</h2>
                    <p>Los mejores bocadillos para nuestra gran cliente.</p>
                    <ul class="ftco-footer-social list-unstyled float-lft mt-3">
                        <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                        <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                        <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md">
                <div class="ftco-footer-widget mb-4 ml-md-4">
                    <h2 class="ftco-heading-2">Contacto</h2>
                    <ul class="list-unstyled">
                        <li><a href="#">Ubicanos</a></li>
                        <li><a href="#">Correos</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md">
                <div class="ftco-footer-widget mb-4">
                    <h2 class="ftco-heading-2">Empresa</h2>
                    <ul class="list-unstyled">
                        <li><a href="about.html">Acerca de nosotros</a></li> 
                    </ul>
                </div>
            </div>
        </div> 
    </div>
`

$("#footer").html(footer)