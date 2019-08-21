const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

//conexão com o react native
io.on("connection", socket => {
    console.log(`Um usuário conectado : ${socket.id}`);
    socket.on("chat message", msg => {
        console.log(msg)
        io.emit("chat message", msg);
    })
})


server.listen(3000, () => console.log("server conectado com sucesso!"));