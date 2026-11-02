// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(num) {
    if (typeof num === "number" && num >= 0){
        presupuesto = num;
    }
    else {
        return -1;
    }

    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, etiquetas) {
    //Propiedades
    this.descripcion = descripcion;

    if(typeof valor === "number" && valor > 0){
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    this.fecha = Date.now();

    this.etiquetas = etiquetas;

    //Métodos
    this.mostrarGastoCompleto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
            Fecha: ${new Date(this.fecha).toLocaleString}
            Etiquetas: 
                - ${this.etiquetas.join("\n - ")} `;
    }

    this.actualizarDescripcion = function(descripcionNueva) {
        this.descripcion = descripcionNueva;
    }

    this.actualizarValor = function(valorNuevo) {
        if(typeof valorNuevo === "number" && valorNuevo > 0) {
            this.valor = valorNuevo;
        }
    }

    this.actualizarFecha = function(fecha) {
        let nuevaFecha = Date.parse(fecha);

        if(!typeof nuevaFecha === "number") {
            this.fecha = nuevaFecha;
        }
    }


}


function listarGastos() {
    return gastos;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
