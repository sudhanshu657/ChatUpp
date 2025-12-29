import express from 'express';
import http from 'http';
import path from 'path';
//when i want to use socket io


import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);

//using socket io
const io = new Server(server);

//now creat a server




app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/server.html"));
});

//websocket connection
io.on("connection", (socket) => {
    console.log("New user connection", socket.id);
    // how to receive msg from frontemed
    socket.on("messageFromClient", (msg) => {
        console.log(msg);

        // sending msg to all clients
        io.emit("messageFromServer", ` ${msg}`);

    })
})

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});