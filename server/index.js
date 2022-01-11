import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

let lastId = 1;
let productos = [
  { codigo: 1, nombre: "producto 1", cantidad: 10, precio: 100 },
];
const app = express();

//usar middleware como parametro global
app.use(bodyParser.json({ type: "application/json" }));
app.use(logs);
app.use(cors());

//Paths
app.get("/", (req, res) => res.send("<h1>API de productos</h1>"));

//usar como parametro especifico para ese endpoint.
// app.get("/productos", isAuthenticated, (req, res) => res.json(productos));

app.get("/productos", (req, res) => {
  const filtro = req.query.filtro;

  if (filtro) {
    return res.json(productos.filter((p) => p.nombre.indexOf(filtro) >= 0));
  } else {
    return res.json(productos);
  }
});

app.post("/productos", (req, res) => {
  console.log("body: ", req.body);
  lastId++;
  const producto = { ...req.body, codigo: lastId };
  productos.push(producto);
  res.status(201);
  res.json(producto);
});

app.get("/productos/:codigo", (req, res) => {
  const codigo = parseInt(req.params.codigo, 10);
  const producto = productos.find((p) => p.codigo == codigo);
  if (!producto) {
    res.status(404);
    res.json({ message: "No existe ningun producto con codigo " + codigo });
  } else {
    res.status(200);
    res.json(producto);
  }
});

app.put("/productos/:codigo", (req, res) => {
  const codigo = parseInt(req.params.codigo, 10);
  const producto = productos.find((p) => p.codigo == codigo);
  if (!producto) {
    res.status(404);
    res.json({ message: "No existe ningun producto con codigo " + codigo });
  } else {
    const index = productos.indexOf(producto);
    const nuevoProducto = (productos[index] = { ...req.body, codigo });
    res.status(200);
    res.json(nuevoProducto);
  }
});

app.delete("/productos/:codigo", (req, res) => {
  const codigo = parseInt(req.params.codigo, 10);
  const producto = productos.find((p) => p.codigo == codigo);
  if (!producto) {
    res.status(404);
    res.json({ message: "No existe ningun producto con codigo " + codigo });
  } else {
    productos = productos.filter((x) => x != producto);
    res.status(200);
    res.json({ message: "Producto eliminado" });
  }
});

app.listen(5001, () => {
  console.log("Express server listening on port 5001");
});

// function isAuthenticated(req, res, next) {
//   const auth = req.headers.authorization;
//   if (auth == "hola-mundo") {
//     next();
//   } else {
//     res.status(401);
//     res.send("Not authorized");
//   }
// }

function logs(req, res, next) {
  console.log(`${req.method}: ${req.originalUrl}`);
  next();
}
