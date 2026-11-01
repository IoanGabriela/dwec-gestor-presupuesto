// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(num) {
    if (num >= 0){
        presupuesto =+ num;
    }
    else {
        alert ('Error, el número introducido no puede ser negativo.')
        presupuesto = -1;
    }

    return presupuesto;
}

function mostrarPresupuesto() {
    alert(`Tu presupuesto actual es de: ${presupuesto} €`);
}

function CrearGasto(num) {
    let gasto;

    if (num >= 0){
        gasto =+ num;
    }
    else {
        alert ('Error, el número introducido no puede ser negativo.')
        gasto = 0;
    }

    return gasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
