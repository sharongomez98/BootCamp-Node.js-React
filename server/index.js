// segun la version de node, el import se realiza de una de las dos siguientes formas.
import http from "http";
// const http = require("http");

const server = http.createServer((req, res) => {
  // res = response de la peticion
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify([
      { codigo: 1, nombre: "producto 1", cantidad: 10, precio: 100 },
      { codigo: 2, nombre: "producto 2", cantidad: 50, precio: 200 },
    ])
  );
  res.end();
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
