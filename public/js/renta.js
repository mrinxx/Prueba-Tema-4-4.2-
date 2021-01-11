"use strict";
//se toman los campos del DOM
let campomatricula = document.getElementById("matricula");
let campomodelo = document.getElementById("modelo");
let campoprecio = document.getElementById("precio");
let campodias = document.getElementById("numerodias");
let campopreciototal = document.getElementById("total");
let camposdevolucion = document.getElementById("camposdevolucion");
let botonbuscar = document.getElementById("boton");
let botoncancelar = document.getElementById("botoncancelar");
let botondevolver = document.getElementById("botondevolver");
//Lista que guarda los coches que se encuentran en el "concesionario"
let listacoches = [];
class Coche {
    constructor(matricula, modelo, precio, fechaalquiler) {
        this.matricula = matricula;
        this.modelo = modelo;
        this.precio = precio;
        this.fechaalquiler = fechaalquiler;
    }
    /*Método que busca en la lista de los coches registrados para su alquiler */
    alquilar() {
        botondevolver.disabled = true; //se deshabilita para no poder hacer click en el
        let esta = false; //para ver si el coche está entre los coches del concesionario
        listacoches.forEach(coche => {
            if (coche.matricula == campomatricula.value.toUpperCase()) {
                esta = true;
                /*En caso de que la fecha de alquiler no sea nula es que está alquilado, por lo
                tanto se muestra un aviso y se borran los campos */
                if (coche.fechaalquiler != null) {
                    alert("INFORMACIÓN: Vehículo no disponible");
                    limpiar();
                }
                else {
                    campomodelo.value = coche.modelo;
                    campoprecio.value = coche.precio;
                    botonbuscar.innerText = "Alquilar";
                    /*Se cambia lo que hace el botón de buscar: Se le da la fecha de alquiler, se muestra
                    un mensaje, se restauran los valores del botón y se limpian los campos */
                    botonbuscar.onclick = function () {
                        coche.fechaalquiler = new Date();
                        alert("El coche ha sido alquilado con éxito");
                        botonbuscar.innerText = "Buscar";
                        botonbuscar.setAttribute("onclick", null);
                        botonbuscar.setAttribute("onclick", "cochegenerador.alquilar()");
                        limpiar();
                    };
                    botoncancelar.disabled = false;
                    //lo que se hace al pulsar en cancelar -> limpiar y volver a deshabilitar el botón.
                    //también se devuelve el otro botón a su estado inicial.
                    botoncancelar.onclick = function () {
                        botoncancelar.disabled = true;
                        botonbuscar.innerText = "Buscar";
                        botonbuscar.setAttribute("onclick", null);
                        botonbuscar.setAttribute("onclick", "cochegenerador.alquilar()");
                        limpiar();
                    };
                }
            }
        });
        //si no está entre los coches del concesionario -> ERROR
        if (esta == false) {
            alert("ERROR: Vehículo inexistente en el concesionario");
            limpiar();
        }
    }
    devolver() {
        botonbuscar.disabled = true; //se deshabilita para no poder hacer click en el
        let esta = false; //para ver si esta o no entre los coches del concesionario
        listacoches.forEach(coche => {
            if (coche.matricula == campomatricula.value.toUpperCase()) {
                esta = true;
                if (coche.fechaalquiler == null) {
                    alert("ERROR: Ese coche no está alquilado");
                    limpiar();
                }
                else {
                    //se muestra el div con los campos de la devolucion
                    camposdevolucion.style.display = "block";
                    campomodelo.value = coche.modelo;
                    campoprecio.value = coche.precio;
                    let fechadevolucion = new Date(); //fecha actual
                    let milisegundostotal = fechadevolucion.getTime() - coche.fechaalquiler.getTime(); //tiempo en milisegundos entre la fecha actual y la de alquiler
                    let diastotal = Math.round(milisegundostotal / (1000 * 60 * 60 * 24)); //se pasan los milisegundos a dias 
                    campodias.value = diastotal;
                    campopreciototal.value = diastotal * coche.precio; //calculo del precio total del alquiler
                    /*En este punto, se podría poner que si un coche se alquila y se devuelve en el mismo día, se
                    pagase el importe correspondiente a ese día, sin embargo por políticas de la empresa podría ser que
                    fuese gratis, por lo tanto sin cobrar no está mal  */
                    botondevolver.innerText = "Pagar";
                    /*Cuando se haga click en el botón para pagar, la fecha de alquiler pasa a estar nula, por lo que
                    el coche pasa a no estar alquilado. Tras hacer el pago se muestra un mensaje, se devuelve el botón a su estado incial
                    y se limpian los campos */
                    botondevolver.onclick = function () {
                        coche.fechaalquiler = null;
                        alert("Gracias por realizar el pago");
                        botondevolver.innerText = "Devolver";
                        botondevolver.setAttribute("onclick", null);
                        botondevolver.setAttribute("onclick", "cochegenerador.devolver()");
                        camposdevolucion.style.display = "none";
                        limpiar();
                    };
                    botoncancelar.disabled = false;
                    //lo que se hace al pulsar en cancelar -> limpiar y volver a deshabilitar el botón.
                    //también se devuelve el otro botón a su estado inicial.
                    botoncancelar.onclick = function () {
                        botoncancelar.disabled = true;
                        botondevolver.innerText = "Devolver";
                        botondevolver.setAttribute("onclick", null);
                        botondevolver.setAttribute("onclick", "cochegenerador.devolver()");
                        limpiar();
                    };
                }
            }
        });
        //si no está entre los coches del concesionario -> ERROR
        if (esta == false) {
            alert("ERROR: Vehículo inexistente en el concesionario");
            limpiar();
        }
    }
}
//Coche que simplemente sirve para llamar a la función de dentro de la clase
let cochegenerador = new Coche("", "", 0, null);
//Coches que están en el concesionario y por tanto se añaden a la lista creada anteriormente y 
//que los incluye
let coche1 = new Coche("2356CMN", "Fiat 500", 25, new Date("2020/10/30 20:30:14"));
let coche2 = new Coche("1234DPR", "Seat León", 40, null);
listacoches.push(coche1);
listacoches.push(coche2);
//funcion que limpia todos los campos del DOM. Oculta los que sean necesarios y habilita y deshabilita los botones
function limpiar() {
    campomatricula.value = null;
    campomodelo.value = null;
    campoprecio.value = null;
    campodias.value = null;
    campopreciototal.value = null;
    camposdevolucion.style.display = "none";
    botondevolver.disabled = false;
    botonbuscar.disabled = false;
    botoncancelar.disabled = true;
}
//# sourceMappingURL=renta.js.map