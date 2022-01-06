/* Inicio DataTable */
$(document).ready(function () {
  Listar();
});

let form = document.getElementById("formNuevaPersona");
//Cuando el documento termina de cargarse...
document.addEventListener("DOMContentLoaded", function (event) {
  let DatosDelLocalStorage = JSON.parse(localStorage.getItem("Data"));
  DatosDelLocalStorage.forEach(function (arrayData) {
    insertDataTable(arrayData);
  });
});


//Si el usuario clickea el botón de editar o eliminar
function editORdelete(target) {
  //Guardo en variables tipo de botón y el id de la fila
  let typeBtn = target.getAttribute("data-btn");
  var idTarget = parseInt(target.getAttribute("data-id"));
  //Busco el objeto que contenga el id
  let dataLocalStorage = JSON.parse(localStorage.getItem("Data"));
  let indexID = dataLocalStorage.findIndex((element) => element.id === idTarget);
  if (typeBtn == "edit") {
    document.getElementById("editNombre").value=dataLocalStorage[indexID].nombre;
    document.getElementById("editApellido").value=dataLocalStorage[indexID].apellido;
    document.getElementById("editEdad").value=dataLocalStorage[indexID].edad;

    //Si se guarda el formulario, cambiar los datos en el localstorage
    let refFormModal = document.getElementById("FormModal");
    refFormModal.addEventListener("submit", function (event) {
      let dataFormModal = new FormData(refFormModal);
      //Cambio los datos viejos por lo introducidos  en el formulario
      dataLocalStorage[indexID].nombre = dataFormModal.get("nombre");
      dataLocalStorage[indexID].apellido = dataFormModal.get("apellido");
      dataLocalStorage[indexID].edad = dataFormModal.get("edad");
      //Guardo el array de localstorage con la modificación
      guardarArrayLocalStorage(dataLocalStorage);
    });
  } else {
    document.getElementById("P-info-delete").innerHTML = 
    `Seguro que quiere eliminar a <u><b> ${dataLocalStorage[indexID].nombre}</b></u>`;
    document.getElementById("BtnBorrar").addEventListener("click",function(){
      dataLocalStorage.splice(indexID, 1);
      guardarArrayLocalStorage(dataLocalStorage);
      document.location.reload();
    });
  }
  //Funcion para guardar el nuevo array 
  function guardarArrayLocalStorage(array) {
    let NewLocalStorage = JSON.stringify(dataLocalStorage);
    localStorage.setItem("Data", NewLocalStorage);
  }
}
//Si el formulario se evnia...
form.addEventListener("submit", function (event) {
  //event.preventDefault(); Se encuntra comentado, porque sino datatable no me encuentra, ni filtra a la ultima persona que agrego
  let dataForm = new FormData(form);
  let dataFormObjt = convertObjt(dataForm);
  insertDataTable(dataFormObjt);
  guardarLocalStorage(dataFormObjt);
  form.reset();
  //Función para obtener un id del localstorage
  function obtenerID() {
    let dataLocalStorage = JSON.parse(localStorage.getItem("Data")) || [];
    let size = dataLocalStorage.length;
    if (size == 0) {
      return 0;
    } else {
      let ultimodato = dataLocalStorage[size - 1];
      return ultimodato.id + 1;
    }
  }
  //Funcón para convertir el FormData en un objeto
  function convertObjt(dataForm, modal) {
    let id = obtenerID();
    let nombre = dataForm.get("nombre");
    let apellido = dataForm.get("apellido");
    let edad = dataForm.get("edad");
    let fecha = new Date().toLocaleDateString();
    return {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      fecha: fecha,
      id: id,
    };
  }
  //Función para guardar a la persona en el LocalStorage
  function guardarLocalStorage(dataFormObjt) {
    let dataArray = JSON.parse(localStorage.getItem("Data")) || [];
    dataArray.push(dataFormObjt);
    localStorage.setItem("Data", JSON.stringify(dataArray));
  }
});
//Funcion para agregar personas a la tabla
function insertDataTable(dataFormObjt) {
  let tbody = document.querySelector("tbody");
  let row = document.createElement("tr");
  row.insertCell(0).textContent = dataFormObjt["nombre"];
  row.insertCell(1).textContent = dataFormObjt["apellido"];
  row.insertCell(2).textContent = dataFormObjt["edad"];
  row.insertCell(3).textContent = dataFormObjt["fecha"];
  row.insertCell(4).innerHTML = `
    <div class="cont-btn-action">
      <button class="btn-edit" data-id=${dataFormObjt["id"]} data-btn="edit" type="button" data-bs-toggle="modal" data-bs-target="#ModalEdit" onclick="editORdelete(this)">
        <span class="material-icons">edit</span>
      </button>
      <button class="btn-delete" data-id=${dataFormObjt["id"]} data-btn="delete" type="button" data-bs-toggle="modal" data-bs-target="#ModalDelete" onclick="editORdelete(this)">
        <span class="material-icons">delete_outline</span>
      </button>
    </div>`;
  tbody.appendChild(row);
}

//Declaro DataTable
var Listar = function () {
  $("#TablePersonas").DataTable({
    destroy: true,
    language: {
      sProcessing: "Procesando...",
      sLengthMenu: "Mostrar _MENU_ registros",
      sZeroRecords: "No se encontraron resultados",
      sEmptyTable: "Ningún dato disponible en esta tabla =(",
      sInfo:
        "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
      sInfoPostFix: "",
      sSearch: "Buscar:",
      sUrl: "",
      sInfoThousands: ",",
      sLoadingRecords: "Cargando...",
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior",
      },
      oAria: {
        sSortAscending:
          ": Activar para ordenar la columna de manera ascendente",
        sSortDescending:
          ": Activar para ordenar la columna de manera descendente",
      },
      buttons: {
        copy: "Copiar",
        colvis: "Visibilidad",
      },
    },
  });
};
/*
Problema 1
Para mostrar los datos debo recoger los datos del local storage
sacar cada objt y colocar cada dato en una fila nueva.

Al enviar el formulario, debo recoger los datos de los campos
guardarlos en un objt dentro de un array y luego guardarlos en
localstorage.

Problema 2
Debo traer el ultimo id del localstorage y sumarle uno, este id 
se lo tengo que agregar como atributo a la fila correspondiente. 

Problema 3
Al clickear el botón de editar o eliminar se debe abrir el modal correspondiente
con los datos correspondiente, estos datos los voy a obtener a partir del id
del botón que se clickeo. Si se confirma la acción (Eliminar o Editar) debo modificar
del local storage los datos existentes por los recién ingresados en el modal
o eliminar los datos.
*/
