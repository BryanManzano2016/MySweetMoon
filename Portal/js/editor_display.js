
var modal = document.getElementById("myModal");

async function display_modal(tipo, id, isEdit) {
    modal.style.display = "block";
    let name = "";
    let value = 0.0;
    let isTamaño = "";
    let llamada = "";
    let title = "";

    if (isEdit) {
        let response = await fetch("http://localhost:3000/ingrediente/" + id, {
            method: "GET", headers: { 'Content-Type': 'application/json', token: sessionStorage.getItem("token") }
        });
        var data = await response.json();
        name = "value='" + data[0].nombre + "'";
        value = data[0].precio;
        llamada = "putIngredient(" + id + ", '" + tipo + "')";
        title = "Editar " + tipo + " '" + data[0].nombre + "'";

    } else {
        title = "Agregar " + tipo;
        llamada = "createIngredient('" + tipo + "')";
    } if (tipo == "Tamaño") {
        isTamaño = "d-none";
    }

    let content = "";
    content = `<div class="modal-content col-lg-6 col-sm-10">
    <div class="d-flex justify-content-end">
    <span class="close" onclick="closeModal()">&times;</span>
    </div>
    <p class="title">${title}</p>
      <form id="form-cambios">
      <div class="input row">
        <label class="col-12" for="nombre">Nombre:</label> 
        <input class="col-12" type="text" id="nombre" name="nombre" ${name} required>
        <label class="${isTamaño} col-12" for="precio">Precio por porción de torta:</label>
        <input class="${isTamaño} col-12" type="number" step="0.01" id="precio" name="precio" value=${value} required>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <input id="guardar" class="btn btn-primary send-btn" type="button" onclick="${llamada}" value="Guardar">
        <input id="cancelar" class="btn btn-secondary" type="button" onclick="closeModal()" value="Cancelar">
        <input id="btn-submit" type="submit" class="d-none">
      </div>
      </form> </div>`;
    modal.innerHTML = content;

}

async function displayYesNo(tipo, nombre, id){
    modal.style.display = "block";
    let content = "";
    content = `<div class="modal-content col-lg-6 col-sm-10">
    <div class="d-flex justify-content-end">
    <span class="close" onclick="closeModal()">&times;</span>
    </div>
    <span class="title">Eliminar Ingrediente</span>
    <p>¿Desea eliminar permanentemente el elemento '${nombre}'?</p>
    
    <div class="col-12 d-flex justify-content-end">
        <input id="guardar" class="btn btn-primary send-btn" type="button" onclick="deleteIngredient(${id}, '${tipo}')" value="Aceptar">
        <input id="cancelar" class="btn btn-secondary" type="button" onclick="closeModal()" value="Cancelar">
    </div>
    </div>`;
    modal.innerHTML = content;
}

async function putIngredient(id, tipo) {
    let precio = document.getElementById("precio").value;
    let nuevo = document.getElementById("nombre").value;


    fetch('http://localhost:3000/ingrediente/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            precio: precio,
            nombre: nuevo
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log(res.status);
        console.log(res);
        alert('Cambios Guardados!');
        closeModal();
        asignarPaso(tipo);
    }).catch(error => {
        console.log(error);
        alert('No se pudo guardar la modificación!');
    });
}

async function createIngredient(tipo) {
    let form = document.getElementById("form-cambios");

    if (!form[0].checkValidity()) {
        console.log("no cumple");
        document.getElementById("btn-submit").click();
    }else{
        let precio = document.getElementById("precio").value;
        let nombre = document.getElementById("nombre").value;
       
        fetch('http://localhost:3000/ingrediente', {
        method: 'POST',
        body: JSON.stringify({
            precio: precio,
            nombre: nombre,
            tipo: tipo
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if(res.status == 404){
            throw res.status;
        }
        console.log(res.status);
        console.log(res);
        alert('Creado un nuevo Elemento!');
        closeModal();
        asignarPaso(tipo);
    }).catch(error => {
        console.log("y se cayó :c");
        alert('No se pudo guardar la modificación!');
    });
    }
}

async function deleteIngredient(id, tipo){
    fetch('http://localhost:3000/ingrediente/' + id, {
        method: 'DELETE'
    }).then((res) => {
        if(res.status == 404){
            throw res.status;
        }
        console.log(res.status);
        console.log(res);
        alert('El elemento fue eliminado exitosamente!');
        closeModal();
        asignarPaso(tipo);
    }).catch(error => {
        console.log("y se cayó :c");
        alert('No se pudo eliminar el elemento!');
    });
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

