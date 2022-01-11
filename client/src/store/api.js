import axios from "axios";
const url = "http://localhost:5001/productos/";

async function request(httpCall) {
  const response = await httpCall();
  return response.data;
}

const getAll = () => request(() => axios.get(url));
const getProducto = (codigo) => request(() => axios.get(url + codigo));
const addProducto = (producto) => request(() => axios.post(url, producto));
const editProducto = ({ codigo, ...producto }) =>
  request(() => axios.put(url + codigo, producto));
const removeProducto = (codigo) => request(() => axios.delete(url + codigo));

export default{ getAll, getProducto, addProducto, editProducto, removeProducto };
