// import "./js/app";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import App from "./app.js";
import store from "./store";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
test();

async function test() {
  try {
    console.log("Antes del fetch");
    const response = await axios.get("http://localhost:5001/producto");
    const productos = response.data;
    console.log("productos: ", productos);
  } catch (error) {
    console.error("error en el request: ", error);
  }
}
