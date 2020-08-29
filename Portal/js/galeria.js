// instancia de clase VUE
var galeriaseccion = new Vue({
    el: "#galeria",
    data: {
        resultados: [],
    },
    methods: {
        cargarInformacionGaleria: function () {
            cargarContenidoFetch().then((data) => {
                this.resultados = [];
                for (let elemento of data) {
                    elemento.url = "http://localhost:3000/imagen/" + elemento.url;
                    elemento.style = "background-image: url(" + elemento.url + ");";
                    this.resultados.push(elemento);
                    console.log(elemento.url);
                    console.log(elemento.style);
                }
            });
        },
        clickActions: function (id) {
            display_edit_gallery(id);
        },
        deleteGallery: function (id, name) {
            displayYesNo_Gallery(id, name);
        }
    },
});

async function cargarContenidoFetch() {
    let response = await fetch("http://localhost:3000/galeria", {
        method: "GET"
    });
    var data = await response.json();
    return data;
};

async function display_edit_gallery(id) {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    modal.style.overflow = "auto";

    let response = await fetch("http://localhost:3000/galeria/" + id, {
        method: "GET"
    });
    var data = await response.json();
    let alt = "value='" + data[0].alt + "'";
    let url = "http://localhost:3000/imagen/" + data[0].url;
    let llamada = "putPicture(" + id + ")";
    let title = "Editar imagen '" + data[0].alt + "'";

    modal.innerHTML = `<div class="modal-content col-lg-6 col-sm-10">
    <div class="d-flex justify-content-end">
    <span class="close" onclick="closeModal()">&times;</span>
    </div>
    <p class="title">${title}</p>
      <form id="form-cambios">
      <div class="input row">
        <label class="col-12" for="titulo">Título:</label> 
        <input class="col-12" type="text" id="titulo" name="titulo" ${alt} required>
            <img src="${url}" alt="${alt}" class="imgage_modal">
      </div>
      <div class="col-12 d-flex justify-content-end">
        <input id="guardar" class="btn btn-primary send-btn" type="button" onclick="${llamada}" value="Guardar">
        <input id="cancelar" class="btn btn-secondary" type="button" onclick="closeModal()" value="Cancelar">
        <input id="btn-submit" type="submit" class="d-none">
      </div>
      </form> </div>`;
}

async function displayYesNo_Gallery(id, nombre) {
    modal.style.display = "block";
    let content = "";
    content = `<div class="modal-content col-lg-6 col-sm-10">
    <div class="d-flex justify-content-end">
    <span class="close" onclick="closeModal()">&times;</span>
    </div>
    <span class="title">Eliminar Ingrediente</span>
    <p>¿Desea eliminar permanentemente la imagen '${nombre}'?</p>
    
    <div class="col-12 d-flex justify-content-end">
        <input id="guardar" class="btn btn-primary send-btn" type="button" onclick="deletePicture(${id})" value="Aceptar">
        <input id="cancelar" class="btn btn-secondary" type="button" onclick="closeModal()" value="Cancelar">
    </div>
    </div>`;
    modal.innerHTML = content;
}

async function display_create_gallery() {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";

    title = "Agregar nueva Imagen a Galería";
    llamada = "createPicture()";

    modal.innerHTML = `<div class="modal-content col-lg-6 col-sm-10">
    <div class="d-flex justify-content-end">
    <span class="close" onclick="closeModal()">&times;</span>
    </div>
    <p class="title">${title}</p>
      <form id="form-cambios">
      <div class="input row">
        <label class="col-12" for="titulo">Título:</label> 
        <input class="col-12" type="text" id="titulo" name="titulo" required>
        <input type="file" name="file" id='fileinput' accept="image/*" required>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <input id="guardar" class="btn btn-primary send-btn" type="button" onclick="${llamada}" value="Guardar">
        <input id="cancelar" class="btn btn-secondary" type="button" onclick="closeModal()" value="Cancelar">
        <input id="btn-submit" type="submit" class="d-none">
      </div>
      </form> </div>`;
}

async function createPicture() {
    let form = document.getElementById("form-cambios");

    if (!form[0].checkValidity() || !form[1].checkValidity()) {
        console.log("no cumple");
        document.getElementById("btn-submit").click();

    } else {
        let alt = document.getElementById("titulo").value;
        let input = document.getElementById('fileinput');
        let file = input.files[0];
        let url = file.name;
        var form_data = new FormData();

        form_data.append('file', file);
        fetch('http://localhost:3000/imagen', {
            method: 'POST',
            body: form_data
        }).then(
            response => response.json()
        ).then(success => {
            fetch('http://localhost:3000/galeria', {
                method: 'POST',
                body: JSON.stringify({
                    alt: alt,
                    url: url
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (res.status == 404) {
                    throw res.status;
                }
                console.log(res.status);
                console.log(res);
                alert('Guardada una nueva imagen en Galería!');
                closeModal();
                galeriaseccion.cargarInformacionGaleria();
            }).catch(error => {
                console.log("y se cayó :c");
                alert('No se pudo guardar la imagen!');
            });
        }
        ).catch(error => {
            alert('No se pudo guardar la imagen!');
        }
        );
    }
}

async function putPicture(id) {
    let alt = document.getElementById("titulo").value;

    fetch('http://localhost:3000/galeria/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            alt: alt
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log(res.status);
        console.log(res);
        alert('Cambios Guardados!');
        closeModal();
        galeriaseccion.cargarInformacionGaleria();
    }).catch(error => {
        console.log(error);
        alert('No se pudo guardar la modificación!');
    });
}

async function deletePicture(id) {
    fetch('http://localhost:3000/galeria/' + id, {
        method: 'DELETE'
    }).then((res) => {
        if (res.status == 404) {
            throw res.status;
        }
        console.log(res.status);
        console.log(res);
        alert('La imagen fue eliminada exitosamente!');
        closeModal();
        galeriaseccion.cargarInformacionGaleria();
    }).catch(error => {
        console.log("y se cayó :c");
        alert('No se pudo eliminar la imagen!');
    });
}

galeriaseccion.cargarInformacionGaleria();