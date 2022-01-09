const form = document.getElementsByTagName("form")[0];
/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo");
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre");
/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio");
/** @type {HTMLInputElement} */
const selectCategoria = document.getElementById("categoria");
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");
let indice = 1;
let cantidadTotal = 0;
let precioTotal = 0;
let granTotal = 0;
let currentRow;
form.addEventListener("submit", onSubmit);

/**
 * 
 * @param {Event} event 
 */
function onSubmit(event) {
  event.preventDefault();

  const data = new FormData(form);
  const values = Array.from(data.entries());
  const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;
  let codigo = frmCodigo[1];
  const nombre = frmNombre[1];
  const cantidad = frmCantidad[1];
  const precio = frmPrecio[1];
  const categoria = frmCategoria[1];
  const total = cantidad * precio;

  cantidadTotal = parseFloat(cantidad) + cantidadTotal;
  precioTotal = parseFloat(precio) + precioTotal;
  granTotal = parseFloat(total) + granTotal;

  let tr;
  if (!codigo) {
    codigo = indice++;
    tr = document.createElement("tr");
    tbody.appendChild(tr);
  } else {
    tr = currentRow;
  }
  tr.dataset.categoria = categoria;
  tr.innerHTML = `
    <td>${codigo}</td>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio}</td>
    <td>${total}</td>
    <td>
      <div class="btn-group">
        <a title="Editar" href='#' onClick='onEdit(event)' class="btn btn-sm btn-outline-secondary"><i class="bi bi-pencil-square"></i></a> 
        
        <a title="Eliminar" href='#' onClick='onDelete(event)' class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></a>
        </div>
    </td>
  `;
 

  cantidadTotalElement.innerText = cantidadTotal;
  precioTotalElement.innerText = precioTotal;
  granTotalElement.innerText = granTotal;

  form.reset();
  //posicionar el curso en el primer input ejercicio 
}

/**
 * 
 * @param {Event} event 
 */
function onEdit(event) {
  event.preventDefault();
  /** @type {HTMLElement} */
  const anchor = event.currentTarget;
  const tr = anchor.parentElement.parentElement.parentElement;
  const celdas = tr.getElementsByTagName("td");
  const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas;
  console.log("tdCantidad", tdCantidad.innerText);

  inputCodigo.value = tdCodigo.innerText;
  inputNombre.value = tdNombre.innerText;
  inputCantidad.value = tdCantidad.innerText;
  inputPrecio.value = tdPrecio.innerText;
  selectCategoria.value = tr.dataset.categoria;

  currentRow = tr;

}

/**
 * 
 * @param {Event} event 
 */
 function onDelete(event) {
  event.preventDefault();

  /** @type {HTMLElement} */
  const anchor = event.currentTarget;
  const tr = anchor.parentElement.parentElement.parentElement;
  tbody.removeChild(tr);

}