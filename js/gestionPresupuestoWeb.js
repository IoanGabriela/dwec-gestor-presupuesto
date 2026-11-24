// AQUÍ VAN LOS EVENTOS

// Lo pongo así para ahorrarme tener que escribir gestionPresupuesto.función cada vez que quiera usar una función de aquí.
import { 
    actualizarPresupuesto, 
    mostrarPresupuesto, 
    CrearGasto, 
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos, 
    calcularBalance, 
    listarGastos, 
    filtrarGastos, 
    agruparGastos 
} from './gestionPresupuesto.js';

function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.textContent = gasto.descripcion;
    divGasto.appendChild(divDesc);

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = gasto.fecha;
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
    for (let i = 0; i < gasto.etiquetas.length; i++) {
        let etiquetaActual = gasto.etiquetas[i];
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = etiquetaActual;

        // Evento para borrar etiqueta al hacer clic
        let manejadorEtiqueta = new BorrarEtiquetasHandle(gasto, etiquetaActual);
        span.addEventListener("click", manejadorEtiqueta);

        divEtiquetas.appendChild(span);
    }
    }
    divGasto.appendChild(divEtiquetas);

    // Botón Editar
    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";
    let manejadorEditar = new EditarHandle(gasto);
    botonEditar.addEventListener("click", manejadorEditar);
    divGasto.appendChild(botonEditar);

    // Botón Borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";
    let manejadorBorrar = new BorrarHandle(gasto);
    botonBorrar.addEventListener("click", manejadorBorrar);
    divGasto.appendChild(botonBorrar);

    // Botón Editar (form)
    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.type = "button";
    botonEditarFormulario.className = "gasto-editar-formulario";
    botonEditarFormulario.textContent = "Editar (formulario)";

    let manejadorEditarFormulario = new EditarHandleFormulario(gasto);
    botonEditarFormulario.addEventListener("click", manejadorEditarFormulario);

    divGasto.appendChild(botonEditarFormulario);

    contenedor.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    let textoPeriodo = periodo;
    if (periodo === "dia") {
        textoPeriodo = "día";
    } else if (periodo === "anyo") {
        textoPeriodo = "año";
    }

    let h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + textoPeriodo;
    divAgrupacion.appendChild(h1);

    for (let clave in agrup) {
        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = agrup[clave];

        divDato.appendChild(spanClave);
        divDato.appendChild(spanValor);

        divAgrupacion.appendChild(divDato);
    }

    contenedor.appendChild(divAgrupacion);
}

// FUNCIONES PARA EVENTOS
function repintar() {

    // Mostrar presupuesto
    let textoPresupuesto = mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", textoPresupuesto);

    // Mostrar gastos totales
    let gastoTotal = calcularTotalGastos();
    let textoGastoTotal = `Tu gasto total es ${gastoTotal}€`;
    mostrarDatoEnId("gastos-totales", textoGastoTotal);

    // Mostrar el balance total
    let balanceTotal = calcularBalance();
    let textoBalanceTotal = `Tu balance total es ${balanceTotal}€`;
    mostrarDatoEnId("balance-total", textoBalanceTotal);

    // Borrar contenido para no duplicar información
    let contenedorListado = document.getElementById("listado-gastos-completo");
    if (contenedorListado) {
        contenedorListado.innerHTML = "";
    }

    // Mostrar listado completo de gastos
    let listaGastos = listarGastos();
    for (let gst of listaGastos) {
        mostrarGastoWeb("listado-gastos-completo", gst);
    }
}

function actualizarPresupuestoWeb() {
    let textoPresupuestoActualizado = prompt("Introduce tu presupuesto", '');
    let presupuestoActualizado = Number(textoPresupuestoActualizado);

    actualizarPresupuesto(presupuestoActualizado);
    repintar();
}

let botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {

    //Pedir la info necesaria
    let descripcion = prompt("Descripción del gasto:");
    let valorTxt = prompt("Valor del gasto:");
    let fecha = prompt("Fecha del gasto (yyyy-mm-dd):");
    let etiquetasTexto = prompt("Etiquetas del gasto (etiqueta1,etiqueta2):");

    //Convertimos el valor de string a número
    let valorNum = Number(valorTxt);

    //Etiquetas de string a array
    let etiquetasArray;
    if (etiquetasTexto) {
        etiquetasArray = etiquetasTexto.split(",");
    } else {
        etiquetasArray = [];
    }

    //Creamos un nuevo gasto, añadimos y repintamos
    let nuevoGasto = new CrearGasto(descripcion, valorNum, fecha, ...etiquetasArray);

    anyadirGasto(nuevoGasto);
    repintar();
}

let botonAnyadir = document.getElementById("anyadirgasto");
if (botonAnyadir) {
    botonAnyadir.addEventListener("click", nuevoGastoWeb);
}

function EditarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function(event) {
        let fechaDefecto = new Date(this.gasto.fecha).toISOString().slice(0, 10);
        let etiquetasDefecto = this.gasto.etiquetas.join(",");

        let descripcion = prompt("Introduce la nueva descripción:", this.gasto.descripcion);
        let valorTexto = prompt("Introduce el nuevo valor:", this.gasto.valor);
        let fecha = prompt("Introduce la nueva fecha (yyyy-mm-dd):", fechaDefecto);
        let etiquetasTexto = prompt("Introduce las etiquetas separadas por comas:", etiquetasDefecto);

        let valorNumerico = Number(valorTexto);

        let etiquetasArray = [];
        if (etiquetasTexto) {
            etiquetasArray = etiquetasTexto.split(",");
        }

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valorNumerico);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetasArray);

        repintar();
    };
}

function BorrarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function(event) {
        borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;

    this.handleEvent = function(event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}

// FORMULARIOS
function ManejadorCancelar(formulario, botonAnyadir) {
    this.formulario = formulario;
    this.botonAnyadir = botonAnyadir;

    this.handleEvent = function(event) {
    this.formulario.remove();
    this.botonAnyadir.removeAttribute("disabled");
    };
}

function nuevoGastoWebFormulario(event) {
    let botonAnyadir = event.currentTarget;
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    formulario.addEventListener("submit", function(e) {
    e.preventDefault();
    let form = e.currentTarget;
    let descripcion = form.elements.descripcion.value;
    let valorNum = Number(form.elements.valor.value);
    let fecha = form.elements.fecha.value;
    let etiquetasTexto = form.elements.etiquetas.value;

    let etiquetasArray = [];
    if (etiquetasTexto) {
        etiquetasArray = etiquetasTexto.split(",");
    }

    let nuevoGasto = new CrearGasto(descripcion, valorNum, fecha, ...etiquetasArray);

    anyadirGasto(nuevoGasto);
    repintar();

    botonAnyadir.removeAttribute("disabled");
    });

    let botonCancelar = formulario.querySelector("button.cancelar");
    let manejadorCancelar = new ManejadorCancelar(formulario, botonAnyadir);
    botonCancelar.addEventListener("click", manejadorCancelar);

    botonAnyadir.setAttribute("disabled", "true");

    document.getElementById("controlesprincipales").append(plantillaFormulario);
}

export {mostrarDatoEnId, 
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    ManejadorCancelar,
    nuevoGastoWebFormulario
};