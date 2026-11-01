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

function CrearGasto(descripcion, valor) {
    //Propiedades
    this.descripcion = descripcion;

    if(valor >= 0){
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    //Métodos
    this.mostrarGasto = function() {
        alert(`Gasto correspondiente a ${descripcion} con valor ${valor} €`);
    }

    this.actualizarDescripcion = function(descripcionNueva) {
        this.descripcion = descripcionNueva;
    }

    this.actualizarValor = function(valorNuevo) {
        if(valorNuevo >= 0) {
            this.valor = valorNuevo;
        } else {
            this.valor = valor;
        }
    }
}

let gasto = new CrearGasto(descripcion, valor);
gasto.mostrarGasto();
gasto.actualizarDescripcion(descripcionNueva);
gasto.actualizarValor(valorNuevo);


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
