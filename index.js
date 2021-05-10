const express = require("express");
const path = require("path");
const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//starting the server
const server = app.listen(app.get("port"), () => {
  console.log(`Server on  http://localhost:${app.get("port")}`);
});

/******************************************************** */
/******************************************************** */
/******************************************************** */
const SocketIO = require("socket.io");
//socket necesita un servidor inicializado, por eso se le pasa server
const io = SocketIO(server);
//websockets
//metodo que detecta cuando alguien se conecta(nos permite ejecutar una fn cuando alguien se conecta)
io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  //escuchando el evento desde el server del cliente
  socket.on("chat:message", (data) => {
    //mensaje del server a todos los navegadores incluyendo a quien lo envia
    io.sockets.emit("chat:message", data);
  });

  //recibiendo datos cuando un user esta escribiendo
  socket.on("chat:typing", (data) => {
    //transmitiendo los datos a todos excepto al que esta escribindo
    socket.broadcast.emit("chat:typing", data);
  });
});
/******************************************************** */
/******************************************************** */
/******************************************************** */
