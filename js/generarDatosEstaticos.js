import { 
    actualizarPresupuesto, 
    mostrarPresupuesto, 
    CrearGasto, 
    anyadirGasto, 
    calcularTotalGastos, 
    calcularBalance, 
    listarGastos, 
    filtrarGastos, 
    agruparGastos 
} from './gestionPresupuesto.js';

import { 
    mostrarDatoEnId, 
    mostrarGastoWeb, 
    mostrarGastosAgrupadosWeb 
} from './gestionPresupuestoWeb.js';

// ACTUALIZAR PRESUPUESTO
let valor = 1500;
let textoPresupuesto = "";

actualizarPresupuesto(valor);

// MOSTRAR PRESUPUESTO
textoPresupuesto = mostrarPresupuesto(valor);

mostrarDatoEnId("presupuesto", textoPresupuesto);

// CREAR  Y AÑADIR GASTOS
let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

// MOSTRAR GASTOS TOTALES
let gastoTotal = calcularTotalGastos();
let textoGastoTotal = `Tu gasto total es ${gastoTotal}€`;

mostrarDatoEnId("gastos-totales", textoGastoTotal);

// MOSTRAR EL BALANCE TOTAL
let balanceTotal = calcularBalance();
let textoBalanceTotal = `Tu balance total es ${balanceTotal}`;

mostrarDatoEnId("balance-total", textoBalanceTotal);

// MOSTRAR LISTADO COMPLETO GASTOS
let todosGastos = listarGastos();

for(let gst of todosGastos) {
    mostrarGastoWeb("listado-gastos-completo", gst)
}

// GASTOS DE SEPTIEMBRE 2021
let gastoSept21 = filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
})

for (let gst of gastoSept21) {
    mostrarGastoWeb("listado-gastos-filtrado-1", gst);
}

// GASTOS >50€
let gastoSup50 = filtrarGastos({
    valorMinimo: 50
})

for (let gst of gastoSup50){
    mostrarGastoWeb("listado-gastos-filtrado-2", gst);
}

// GASTOS >200€
let gastoSup200 = filtrarGastos({
    valorMinimo: 200
})

for (let gst of gastoSup200) {
    mostrarGastoWeb("listado-gastos-filtrado-3", gst);
}

// GASTOS <50€ + ETIQUETA COMIDA O TRANSPORTE
let gastoInf50 = filtrarGastos({
    valorMaximo: 49,
    etiquetasTiene: ["comida", "transporte"]
})

for (let gst of gastoInf50) {
    mostrarGastoWeb("listado-gastos-filtrado-4", gst);
}

// GASTOS POR DÍA
let gastosDia = agruparGastos("dia");
mostrarGastosAgrupadosWeb("agrupacion-dia", gastosDia, "dia");

// GASTOS POR MES
let gastosMes = agruparGastos("mes");
mostrarGastosAgrupadosWeb("agrupacion-mes", gastosMes, "mes");

//GASTOS POR AÑO
let gastosAnyo = agruparGastos("anyo");
mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAnyo, "anyo");
