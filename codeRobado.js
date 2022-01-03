/**
  Funcion para ordenar una tabla... tiene que recibir el numero de columna a
  ordenar y el tipo de orden
  @param int n
  @param str type - ['str'|'int']
 */
function sortTable(n,type) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;

  table = document.getElementById("TablePersonas");
  switching = true;
  //Establecer la dirección de clasificación en ascendente:
  dir = "asc";

  /*Haga un bucle que continuará hasta que no se haya realizado ningún cambio:*/
  while (switching) {
    //comience diciendo: no se realiza ningún cambio:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare, one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place, based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (
          (type == "str" &&
            x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
          (type == "int" && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))
        ) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (
          (type == "str" &&
            x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) ||
          (type == "int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))
        ) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*Si se ha marcado un cambio, hágalo y marque que se ha realizado un cambio:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}