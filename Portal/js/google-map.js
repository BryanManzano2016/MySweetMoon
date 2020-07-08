
var googleMap;
var googleServicioDirecciones;
//-2.242921, -79.894424
var posicionInicial = { lat: -2.242921, lng: -79.894424};
var marcadoresActuales = [];
var rutasActuales = [];
var mensajesError = "";
var mensajesAdvertencia = "";
var infoWindow;

function init() {
    // Crear el mapa y centrarlo en la posición inicial
    googleMap = new google.maps.Map(document.getElementById('map'), {
        center: posicionInicial,
        zoom: 16
    });

    infoWindow = new google.maps.InfoWindow;

    // Instanciar el servicio de direcciones
    googleServicioDirecciones = new google.maps.DirectionsService;

    //geolocalización del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          createRoute(pos);
        }, function() {
          handleLocationError(true, infoWindow, googleMap.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, googleMap.getCenter());
    }
}

function createRoute(pos){
    console.log(pos);
    console.log(posicionInicial);

    if (pos !== null) {
        // Solicitar las indicaciones para viajar entre las rutas indicadas
        googleServicioDirecciones.route({
            origin: { lat: pos.lat, lng: pos.lng},
            destination: { lat: posicionInicial.lat, lng: posicionInicial.lng },
            travelMode: 'DRIVING'
        }, function(response, status) {
            // Procesar la respuesta recibida...
            if (status === 'OK') {
                if (response.routes[0].warnings.length > 0) {
                    mensajesAdvertencia += response.routes[0].warnings + "\r\n";
                }

                // Instancias el renderizador de las direcciones y vincularlo al mapa
                var renderizadorDirecciones = new google.maps.DirectionsRenderer({
                    map: googleMap,
                    preserveViewport : true,
                    suppressMarkers: true
                });
                renderizadorDirecciones.setDirections(response);
                rutasActuales.push(renderizadorDirecciones);
            } else {
                mensajesError += 'Solicitud de direcciones falló: ' + status + "\r\n";
            }
        });
    }

    // Dibujar un marcador en la ruta actual...
    var marker1 = new google.maps.Marker({
        position: { lat: posicionInicial.lat, lng: posicionInicial.lng },
        map: googleMap,
        title: "MySweetMoon"
    });
    marcadoresActuales.push(marker1);

    if(pos!== null){
        var marker2 = new google.maps.Marker({
            position: { lat: pos.lat, lng: pos.lng },
            map: googleMap,
            title: "Tu ubicación"
        });
        marcadoresActuales.push(marker2);
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(googleMap);
  }

function leerMensajesError() {
    return mensajesError;
}

function leerMensajesAdvertencia() {
    return mensajesAdvertencia;
}

google.maps.event.addDomListener(window, 'load', init);