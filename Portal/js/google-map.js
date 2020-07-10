
var googleMap;
var googleServicioDirecciones;
//-2.242921, -79.894424
var posicionInicial = { lat: -2.242921, lng: -79.894424};
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

    var marker1 = new google.maps.Marker({
        position: { lat: posicionInicial.lat, lng: posicionInicial.lng },
        map: googleMap,
        label: "🍰"
    });

    var Stringcontent = 
    '<h6>My Sweet Moon</h6>'+
    '<div>Cdla. Las Terrazas</div><div>mz. b villa 15</div>'+
    '<a href="https://www.google.com/maps/place/My+Sweet+Moon/@-2.2428145,-79.8944305,15z/data=!4m5!3m4!1s0x0:0x9c6ad13b9a17193!8m2!3d-2.2428145!4d-79.8944305">Ver en Google Maps'+
    '</a>'

    var infoMSM = new google.maps.InfoWindow({
        content: Stringcontent
      });

    marker1.addListener('click', function() {
        infoMSM.open(googleMap, marker1);
      });
}

function createRoute(pos){
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
            } else {
                mensajesError += 'Solicitud de direcciones falló: ' + status + "\r\n";
            }
        });
    }


    if(pos!== null){
        var marker2 = new google.maps.Marker({
            position: { lat: pos.lat, lng: pos.lng },
            map: googleMap,
            title: "Tu ubicación"
        });
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: No se ha podido encontrar tu ubicación.' :
                          'Error: El navegador no acepta geolocalización.');
    infoWindow.open(googleMap);
  }

function leerMensajesError() {
    return mensajesError;
}

function leerMensajesAdvertencia() {
    return mensajesAdvertencia;
}

google.maps.event.addDomListener(window, 'load', init);