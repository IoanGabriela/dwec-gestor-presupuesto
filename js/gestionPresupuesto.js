// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;
let fechaParseada = Date.parse(fecha);

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


function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    //Propiedades
    this.descripcion = descripcion;

    if(typeof valor === "number" && valor > 0){
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (!isNaN(fechaParseada)) {
        this.fecha = fechaParseada;
    } else {
        this.fecha = Date.now();
    }

    this.etiquetas = [];

    //Métodos
    this.mostrarGastoCompleto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
            Fecha: ${new Date(this.fecha).toLocaleString()}
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

    this.actualizarFecha = function(fechaNueva) {
        let timestampNuevo = Date.parse(fechaNueva);
        if (!isNaN(timestampNuevo)) {
            this.fecha = timestampNuevo;
        }
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasABorrar.includes(etiqueta));
    };

}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let gasto of gastos) {
        total += gasto.valor;
    }

    return total;
}

function calcularBalance() {
    
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
