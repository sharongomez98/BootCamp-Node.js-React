import React from "react";
import ReactDom from "react-dom";

const container = document.getElementById("root");
const App = () => (
    <div>
        <h1>Hola React</h1>
    </div>
);

ReactDom.render(<App />, container);