import React from "react";

export const Encabezado = (props) => (
  <h1>
    {props.titulo} - {props.valor}
  </h1>
);

export const Productos = (props) => (
  <ul>
    {props.productos.map((item) => (
      <Producto
        key={item.codigo}
        codigo={item.codigo}
        nombre={item.nombre}
        cantidad={item.cantidad}
        onProductClick={props.onProductClick}
      />
    ))}
  </ul>
);

const Producto = (props) => (
  <li className="producto" onClick={(e) => props.onProductClick(props, e)}>
    Nombre: {props.nombre}, Cantidad: {props.cantidad}
  </li>
);
