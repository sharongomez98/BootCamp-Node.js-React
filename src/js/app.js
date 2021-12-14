import { applyMiddleware, createStore } from "redux";
import { ui } from "./ui";
import * as $store from "./store";

const preloadedState = {
  producto: {},
  productos: [],
};

const middlewares = applyMiddleware(
  $store.loggerMiddleware,
  $store.agregarOModificarProductoMiddleware,
  $store.generadorCodigoProductoBuilder(0)
);

const store = createStore($store.reducer, preloadedState, middlewares);

store.subscribe(dispatchOnChange(store.getState, (state) => {
  ui.renderForm(state.producto);
  ui.renderTable(state.productos);
}))

ui.onFormSubmit = (producto) => store.dispatch($store.agregarOModificarProducto(producto));
ui.onEliminarClick = (codigo) => store.dispatch($store.productoEliminado(codigo));
ui.onEditarClick = (codigo) => store.dispatch($store.productoSeleccionado(codigo));

function dispatchOnChange(getState, dispatch) {
  let latestState;

  return function () {
    let currentState = getState();
    if (currentState != latestState) {
      latestState = currentState;
      dispatch(currentState);
    }
  };
}
