$(document).ready(function () {
  $("#TablePersonas").DataTable({
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
});
let form = document.getElementById("formNuevaPersona");
document.addEventListener("DOMContentLoaded", function(event){
  let DatosDelLocalStorage= JSON.parse(localStorage.getItem("Data"));
  DatosDelLocalStorage.forEach(function(arrayData){
    insertDataTable(arrayData);
  });
});
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let dataForm = new FormData(form);
  let dataFormObjt = convertObjt(dataForm);
  insertDataTable(dataFormObjt);
  guardarLocalStorage(dataFormObjt);
  form.reset();

  function convertObjt(dataForm) {
    let nombre = dataForm.get("nombre");
    let apellido = dataForm.get("apellido");
    let edad = dataForm.get("edad");
    let fecha = new Date().toLocaleDateString();
    return {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      fecha: fecha,
    };
  } 
  function guardarLocalStorage(dataFormObjt){
    let dataArray= JSON.parse(localStorage.getItem("Data")) || [];
    dataArray.push(dataFormObjt);
    localStorage.setItem("Data",JSON.stringify(dataArray));
  } 
});
function insertDataTable(dataFormObjt) {
  let tbody = document.querySelector("tbody");
  let row = document.createElement("tr");
  row.insertCell(0).textContent = dataFormObjt["nombre"];
  row.insertCell(1).textContent = dataFormObjt["apellido"];
  row.insertCell(2).textContent = dataFormObjt["edad"];
  row.insertCell(3).textContent = dataFormObjt["fecha"];
  tbody.appendChild(row);
}

/*

Para mostrar los datos debo recoger los datos del local storage
sacar cada objt y colocar cada dato en una fila nueva.

Al enviar el formulario, debo recoger los datos de los campos
guardarlos en un objt dentro de un array y luego guardarlos en
localstorage.

*/
