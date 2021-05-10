const socket = io(); //por lo general recibe como parametro el url del dominio

//DOM elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//enviand datos al servidor con "emit"
btn.addEventListener("click", function () {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
  });
  message.value = "";
});

message.addEventListener("keypress", function () {
  console.log(username.value);
  socket.emit("chat:typing", username.value);
});
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//rescibiendo los datos del servidor
socket.on("chat:message", function (data) {
  actions.innerHTML = "";
  output.innerHTML += `
        <p><strong>${data.username}</strong>: ${data.message}</p>
    `;
});

socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p style="color:green"><em>${data} esta escribiendo...</em></p>`;
});
