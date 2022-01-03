let btnfilter1 = document.getElementById("btnFilter1");
let btnfilter2 = document.getElementById("btn-filter-2");
let btnfilter3 = document.getElementById("btn-filter-3");
let btnfilter4 = document.getElementById("btn-filter-4");
let tableRef= document.getElementById("TablePersonas");
//let formNuevaPersona= document.getElementById("formNuevaPersona");
/* btn_filter_2.addEventListener("click",ordenar_apellido(tableRef));
btn_filter_3.addEventListener("click",ordenar_edad(tableRef));
btn_filter_4.addEventListener("click",ordenar_fecha(tableRef)); */


formNuevaPersona.addEventListener("submit",cargarPersona());
function obtenerFecha(){
    let fecha = new Date;
    let dia = fecha.getDay();
    let mes = fecha.getMonth();
    let anio = fecha.getFullYear();
    let FechaString=`${dia}/${mes}/${anio}`;
    return FechaString;
}
function cargarPersona(){   
}
function ordenarNombres (tableRef){
    function nuevaTabla(tableRef,arrayOrdenado){
        //let arrayConcatenado= arrayOrdenado.join(" ");
        let tbody = tableRef.querySelector("tbody");
        tbody.innerHTML="";
        for (let i = 0; i < arrayOrdenado.length; i++) {
            let tr= tbody.insertRow(-1);

            let td = tr.insertCell(0);
            td.textContent = arrayOrdenado[i].childNodes[1].innerText;
                
            td = tr.insertCell(1);
            td.textContent = arrayOrdenado[i].childNodes[3].innerText;
                
            td = tr.insertCell(2);
            td.textContent = arrayOrdenado[i].childNodes[5].innerText;
                
            td = tr.insertCell(3);
            td.textContent = arrayOrdenado[i].childNodes[7].innerText;
        }
    }
    let todasLasFilas = tableRef.querySelectorAll("tr[data-fila=filaPersona]");
    let arrayFilas= Array.from(todasLasFilas);
    let arrayOrdenado = arrayFilas.sort((name1,name2)=>{
        nombre1 = name1.childNodes[1].innerText
        nombre2 = name2.childNodes[1].innerText
        return ( nombre1< nombre2) ? -1 : 1;
    });
    nuevaTabla(tableRef,arrayOrdenado);
    
    console.log("Hola");
    /* 
        Tengo que agarra todas las filas, por cada fila que agarro tengo que ver si el nombre es menor que el anterior. La fila con el nombre menor
        se guarda en un array de filas ordenadas
    */
}
btnfilter1.addEventListener("click", function() {      
        ordenarNombres(tableRef);
});

