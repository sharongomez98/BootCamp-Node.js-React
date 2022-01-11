import api from "./api";
import { push } from "connected-react-router";

const asignarProductos = (payload) => ({
  type: "asignar-productos",
  payload,
});

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    switch (action.type) {
      case "obtener-productos": {
        const productos = await api.getAll();
        dispatch(asignarProductos(productos));
        break;
      }
      case "producto-agregado": {
        await api.addProducto(action.payload);
        dispatch(push("/"));
        break;
      }
      case "producto-modificado": {
        await api.editProducto(action.payload);
        dispatch(push("/"));
        break;
      }
      case "producto-eliminado": {
        await api.removeProducto(action.payload.codigo);
        const productos = await api.getAll();
        dispatch(asignarProductos(productos));
        break;
      }
      case "producto-selecionado": {
        const { codigo } = action.payload;
        if (codigo) {
          const producto = await api.getProducto(codigo);
          next({ type: action.type, payload: producto });
        } else {
            next({ type: action.type, payload: {} });
        }

        break;
      }
      default:
        next(action);
        break;
    }
  };

export default apiMiddleware;
