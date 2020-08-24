
var modal = document.getElementById("myModal");

async function display_modal(tipo, id, isEdit, nuevo) {
    modal.style.display = "block";
    let name = "";
    let value = 0.0;
    let isTamaño = "";
    let llamada = "";

    if (isEdit) {
        let response = await fetch("http://localhost:3000/ingrediente/" + id, {
            method: "GET"
        });
        var data = await response.json();
        name = data[0].nombre;
        value = data[0].precio;
        llamada = "putIngredient(" + id + ", '"+ tipo +"')";

    }else{
        llamada = "createIngredient('" + tipo + "')";
    } if (tipo == "Tamaño") {
        isTamaño = "d-none";
    }

    let content = "";
    content = `<div class="modal-content">
    <div class="d-flex justify-content-end">
    <span class="close" onclick="closeModal()">&times;</span>
    </div>
    <span class="title">${tipo}</span>
      <form>
      <div class="input row">
        <label class="col-12" for="nombre">Nombre:</label>
        <input class="col-12" type="text" id="nombre" name="nombre" value="${name}" required>
        <label class="${isTamaño} col-12" for="precio">Precio por porción de torta:</label>
        <input class="${isTamaño} col-12" type="number" step="0.01" id="precio" name="precio" value=${value} required>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <input class="btn btn-primary send-btn" type="button" onclick="${llamada}" value="Guardar">
        <input id="cancelar" class="btn btn-secondary" type="button" onclick="closeModal()" value="Cancelar">
      </div>
      </form> </div>`;
    modal.innerHTML = content;

}

async function putIngredient(id, tipo) {
    debugger;
    let precio = document.getElementById("precio").value;
    let nuevo = document.getElementById("nombre").value;
    

    fetch('http://localhost:3000/ingrediente/' + id, {
        method: 'PUT', 
        body: JSON.stringify({
            precio: precio,
            nombre: nuevo}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        console.log(res.status);
        console.log(res);
        alert('Mensaje Enviado!');
        closeModal();
        asignarPaso(tipo);
    }).catch(error => {
        console.log(error);
        alert('No se pudo guardar la modificación!');
    });
}

async function createIngredient(tipo){

}


function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

