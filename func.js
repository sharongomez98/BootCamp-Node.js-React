
// function mensaje(prefijo, formateador) {
//     return function (texto) {
//         return formateador(prefijo, texto);
//     }
// }
const mensaje = (prefijo, formateador) => (texto) => formateador(prefijo, texto);
const bienvenida = mensaje("hola", (prefijo, texto) => `¡${prefijo} ${texto}!`);
const despedida = mensaje("adios", (prefijo, texto) => `${prefijo} ${texto}... :(`);

console.log(bienvenida("mundo"));
console.log(despedida("mundo"));

//32:40