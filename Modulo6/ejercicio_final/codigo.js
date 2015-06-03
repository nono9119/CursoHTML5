var obj = prompt("Introduce el objeto para saber sus propiedades: ");
// Convierto a minuscula lo introducido para comprobar mas tarde
obj = obj.toLowerCase();
// Elimino this. y window.
obj = obj.replace("this.", "");
obj = obj.replace("window.", "");
var error = document.getElementById("error");
var i;

// Compruebo si lo introducido corresponde a un objeto de window
if (typeof(window[obj]) !== "object") {
	error.innerHTML = "El nombre introducido, <strong>" + obj + "</strong> no corresponde a un objeto.";
} else {
	error.innerHTML = " ";
	// Creo un titulo con el nombre introducido
	document.write("<h2><u>" + obj.toUpperCase() + "</u></h2>");
	// Creo la tabla donde estaran las propiedades y valores
	document.write("<table id='tabla'><tr><th>Propiedad</th><th>Valor</th></tr>");
	// Obtengo la tabla como elemento del documento html
	var tabla = document.getElementById("tabla");
	// Con el bucle obtengo todos las propiedades y valores del objeto
	for (i in window[obj]) {
		// En caso de que no pueda visualizarse la informacion muestro el mensaje correspondiente
		if (typeof([obj][i]) === "function" || (typeof(window[obj][i]) === "object")) {
			tabla.innerHTML += "<tr><td>" + i + "</td><td>No puede imprimirse</td></tr>";
		} else {
			tabla.innerHTML += "<tr><td>" + i + "</td><td> = " + window[obj][i] + "</td></tr>";
		}
	}
	document.write("</table>");
}