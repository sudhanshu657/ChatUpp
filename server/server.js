import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files correctly
app.use(express.static(path.resolve("public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/server.html"));
});

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    socket.on("messageFromClient", (msg) => {
        io.emit("messageFromServer", msg);
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
