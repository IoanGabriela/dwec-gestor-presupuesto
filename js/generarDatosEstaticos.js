import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

let valor = 1500;
let textoPresupuesto = "";

actualizarPresupuesto(valor);

textoPresupuesto = mostrarPresupuesto(valor);

mostrarDatoEnId("presupuesto", texto);

let gasto1 = CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

let gastoTotal = calcularTotalGastos();
let textoGastoTotal = `Tu gasto total es ${gastoTotal}€`;

mostrarDatoEnId("gastos-totales", textoGastoTotal);