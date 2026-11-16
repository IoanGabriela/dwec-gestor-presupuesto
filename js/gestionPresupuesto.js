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

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    //Propiedades
    this.descripcion = descripcion;

    if(typeof valor === "number" && valor > 0){
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    let fechaParseada = Date.parse(fecha);

    if (!isNaN(fechaParseada)) {
        this.fecha = fechaParseada;
    } else {
        this.fecha = Date.now();
    }

    this.etiquetas = [];

    //Métodos
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function() {
        let resultado = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.` +
                        `\nFecha: ${new Date(this.fecha).toLocaleString()}` +
                        `\nEtiquetas:\n- ${this.etiquetas.join("\n- ")}`;

        return resultado + "\n";
    };

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
        let etiquetasFiltradas = [];

        for (let i = 0; i < this.etiquetas.length; i++) {
            let etiquetaActual = this.etiquetas[i];
            if (!etiquetasABorrar.includes(etiquetaActual)) {
                etiquetasFiltradas.push(etiquetaActual);
            }
        }

        this.etiquetas = etiquetasFiltradas;
    };

    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fechaObj = new Date(this.fecha);
        let iso = fechaObj.toISOString();

        if (periodo === "dia") {
            return iso.slice(0, 10);
        } else if (periodo === "mes") {
            return iso.slice(0, 7);  
        } else if (periodo === "anyo") {
            return iso.slice(0, 4);
        }
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
            break;
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
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(opciones) {
    if (!opciones) {
        opciones = {};
    }

    return gastos.filter(function(gasto) {
        if (opciones.fechaDesde !== undefined) {
            let fechaDesdeMs = Date.parse(opciones.fechaDesde);
            if (!isNaN(fechaDesdeMs) && gasto.fecha < fechaDesdeMs) {
                return false;
            }
        }

        if (opciones.fechaHasta !== undefined) {
            let fechaHastaMs = Date.parse(opciones.fechaHasta);
            if (!isNaN(fechaHastaMs) && gasto.fecha > fechaHastaMs) {
                return false;
            }
        }

        if (opciones.valorMinimo !== undefined) {
            if (gasto.valor < opciones.valorMinimo) {
                return false;
            }
        }

        if (opciones.valorMaximo !== undefined) {
            if (gasto.valor > opciones.valorMaximo) {
                return false;
            }
        }

        if (opciones.descripcionContiene !== undefined && opciones.descripcionContiene !== "") {
            let descripcionGasto = gasto.descripcion.toLowerCase();
            let textoBusqueda = opciones.descripcionContiene.toLowerCase();
            if (!descripcionGasto.includes(textoBusqueda)) {
                return false;
            }
        }

        if (opciones.etiquetasTiene !== undefined && Array.isArray(opciones.etiquetasTiene) && opciones.etiquetasTiene.length > 0) {
            let tieneAlgunaEtiqueta = false;

            for (let i = 0; i < opciones.etiquetasTiene.length; i++) {
                let etiquetaBuscada = opciones.etiquetasTiene[i].toLowerCase();

                for (let j = 0; j < gasto.etiquetas.length; j++) {
                    let etiquetaGasto = gasto.etiquetas[j].toLowerCase();
                    if (etiquetaBuscada === etiquetaGasto) {
                        tieneAlgunaEtiqueta = true;
                        break;
                    }
                }

                if (tieneAlgunaEtiqueta) {
                    break;
                }
            }

            if (!tieneAlgunaEtiqueta) {
                return false;
            }
        }

        return true;
    });
}

function agruparGastos(periodo, etiquetas = [], fechaDesde, fechaHasta) {
    if (!periodo) {
        periodo = "mes";
    }

    if (!fechaHasta) {
        fechaHasta = new Date().toISOString();
    }

    let opcionesFiltro = {
        fechaHasta: fechaHasta
    };

    if (fechaDesde) {
        opcionesFiltro.fechaDesde = fechaDesde;
    }

    if (etiquetas && Array.isArray(etiquetas) && etiquetas.length > 0) {
        opcionesFiltro.etiquetasTiene = etiquetas;
    }

    
    let gastosFiltrados = filtrarGastos(opcionesFiltro);

    return gastosFiltrados.reduce(function(acc, gasto) {
        let clavePeriodo = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acc[clavePeriodo]) {
            acc[clavePeriodo] += gasto.valor;
        } else {
            acc[clavePeriodo] = gasto.valor;
        }

        return acc;
    }, {});
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
    CrearGasto,
    filtrarGastos,
    agruparGastos
}
