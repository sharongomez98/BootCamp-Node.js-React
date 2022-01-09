// import "./js/app";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app.js";
import store from "./store";


const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
