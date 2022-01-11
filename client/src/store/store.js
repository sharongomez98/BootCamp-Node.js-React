const ActionTypes = {
  ProductoAgregado: "producto-agregado",
  ProductoModificado: "producto-modificado",
  ProductoEliminado: "producto-eliminado",
  ProductoSeleccionado: "producto-selecionado",
  ProductoAgregadoOModificado: "producto-agregado-o-modificado",
  AsignarProductos: "asignar-productos",
};

export const producto = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ProductoSeleccionado:
      return action.payload
    default:
      return state;
  }
}

export const productos = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.AsignarProductos:
      return action.payload
    default:
      return state;
  }
}

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case ActionTypes.ProductoSeleccionado:
//       return {
//         ... state,
//         producto:action.payload
//       }
//     case ActionTypes.AsignarProductos:
//       return {
//         ... state,
//         productos: action.payload
//       };
//     default:
//       return state;
//   }
// };

export const productoSeleccionado = (codigo) => ({
  type: ActionTypes.ProductoSeleccionado,
  payload: { codigo },
});

export const productoAgregado = (payload) => ({
  type: ActionTypes.ProductoAgregado,
  payload,
});

export const productoModificado = (payload) => ({
  type: ActionTypes.ProductoModificado,
  payload,
});

export const productoEliminado = (codigo) => ({
  type: ActionTypes.ProductoEliminado,
  payload: { codigo },
});

export const agregarOModificarProducto = (payload) => ({
  type: ActionTypes.ProductoAgregadoOModificado,
  payload,
});

export const loggerMiddleware = (store) => (next) => (action) => {
  console.log("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  return result;
};

export const storageMiddleware = (store) => (next) => (action) => {
  const actions = [
    ActionTypes.productoAgregado,
    ActionTypes.productoModificado,
    ActionTypes.productoEliminado
  ];
  const result = next(action);
  if (actions.indexOf(action.type) < 0) {
    return result;
  }
  const state = store.getState();
  sessionStorage.setItem("state", JSON.stringify(state));
  return result;
};

export const agregarOModificarProductoMiddleware =
  (store) => (next) => (action) => {
    if (action.type != ActionTypes.ProductoAgregadoOModificado) {
      return next(action);
    }
    const producto = action.payload;

    const actionToDispatch = producto.codigo
      ? productoModificado(producto)
      : productoAgregado(producto);
    store.dispatch(actionToDispatch);
    return store.dispatch(productoSeleccionado(null));
  };

export const generadorCodigoProductoMiddleware =
  (store) => (next) => (action) => {
    if (action.type != ActionTypes.ProductoAgregado) {
      return next(action);
    }
    action.payload = { ...action.payload, codigo };
  };

function productoSeleccionadoReducer(state, action) {
  const codigo = action.payload.codigo;
  return {
    ...state,
    producto: state.productos.find((item) => item.codigo == codigo) || {},
  };
}

export function generadorCodigoProductoBuilder(codigoInicial) {
  let codigo = codigoInicial;
  return (store) => (next) => (action) => {
    if (action.type != ActionTypes.ProductoAgregado) {
      return next(action);
    }
    codigo++;
    const actionToDispatch = {
      ...action,
      payload: {
        ...action.payload,
        codigo,
      },
    };
    return next(actionToDispatch);
  };
}
