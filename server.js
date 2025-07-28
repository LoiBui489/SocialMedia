import { createServer } from "node:http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3005;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let onlineUsers = [];
const addUser = (username, socketId) => {
    const isExist = onlineUsers.find((user) => user.socketId === socketId);

    if (!isExist) {
        onlineUsers.push({ username, socketId });
    }
}
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}
const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
}

app.prepare().then(() => {
    const htppServer = createServer(handler);
    const io = new Server(htppServer);

    io.on("connection", (socket) => {
        socket.on("newUser", (username) => {
            addUser(username, socket.id);
            console.log("=====> A user connected " + socket.id);
        });

        socket.on("disconnect", () => {
            removeUser(socket.id);
            console.log("=====> A user disconnected " + socket.id);
        });

        socket.on("sendNotification", ({reciverUsername, data}) => {
            const reciver = getUser(reciverUsername);

            io.to(reciver.socketId).emit("getNotification", {
                id: uuidv4(),
                ...data
            });
        })
    });

    htppServer.once("error", (err) => {
        console.error(err);
        process.exit(1);
    }).listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});