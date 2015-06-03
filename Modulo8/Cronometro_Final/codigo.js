$(function() {
    // Funcion almacenada localmente para el tiempo
    localStorage.tiempo = (localStorage.tiempo || "0.0");
    // Para los intervalos
    var intervalo; 
    // Obtengo los contenedores
    var cl = $("#crono");
    var paradas = $("#paradas");
    // Variable para almacenar las paradas
    var paradas_guardadas = [];

    // Funcion para ir incrementando el valor del cronometro
    function incremento() {
        localStorage.tiempo = +localStorage.tiempo + 0.1;
    };
    // Mostrar el valor del cronometro con un decimal
    function mostrar() {
         cl.html((+localStorage.tiempo).toFixed(1));
    };
    // Iniciar el cronometro
    function arrancar() {
        intervalo = setInterval(function() { incremento(); mostrar() }, 100);
    };
    // Parar el cronometro
    function parar() {
        clearInterval(intervalo);
        intervalo = undefined;
        paradas_guardadas.push($("#crono").html());
    };
    // Alterna entre arrancar/parar
    function cambiar() {
        if (!intervalo) {
            arrancar();
        } else {
            parar();
        }

        mostrar_paradas();
    };
    // Comprobacion para no inicializar el cronometro en marcha
    function inicializar() {
        if (!intervalo) {
            localStorage.tiempo = "0.0"; 
            mostrar();
        } else {
            mostrar();
        }

        if (paradas_guardadas.length > 0) {
            paradas_guardadas = [];
            mostrar_paradas();
        }
        
    };
    // Mostrar las paradas que se han realizado
    function mostrar_paradas() {
        var parada = "";
        for (var i = 0; i < paradas_guardadas.length; i++) {
            parada += "<div id='parada'>" + paradas_guardadas[i] + "<br></div>";
        }
        $("#paradas").html(parada);
    };

    // Manejador con botones
    $("#cambiar").on('click', cambiar);
    $("#inicializar").on('click', inicializar);

    // Manejador con eventos touch
    // Arrancar el cronometro con swipe
    $("body").on("swipeRight", function() { cl.html("0.0"); });
    // Al toque arranca-para
    $("body").on("tap", cambiar);

    mostrar();
});    