const preloadedState = {
  producto: {},
  productos: [],
};

const store = Redux.createStore(reducer, preloadedState);

let latestState;

store.subscribe(() => {
  let currentState = store.getState();
  if (currentState != latestState) {
    latestState = currentState;
    ui.renderForm(currentState.producto);
    ui.renderTable(currentState.productos);
  }
});

ui.onFormSubmit = (producto) => {
  if (producto.codigo) {
    store.dispatch(productosStore.productoModificado(producto));
  } else {
    store.dispatch(productosStore.productoAgregado(producto));
  }
  store.dispatch(productosStore.productoSeleccionado(null));
};

ui.onEliminarClick = (codigo) =>
  store.dispatch(productosStore.productoEliminado(codigo));

ui.onEditarClick = (codigo) =>
  store.dispatch(productosStore.productoSeleccionado(codigo));
