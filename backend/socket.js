import { Server } from "socket.io";

let io;
const userSocketMap = new Map();

const broadcastOnlineUsers = () => {
    const onlineUsers = Array.from(userSocketMap.keys());
    io.emit("getOnlineUsers", onlineUsers);
};

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:5174"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Register userId → socketId mapping and broadcast online users
        socket.on("register", (userId) => {
            userSocketMap.set(String(userId), socket.id);
            console.log(`User ${userId} registered with socket ${socket.id}`);
            broadcastOnlineUsers();
        });

        socket.on("disconnect", () => {
            for (let [userId, socketId] of userSocketMap) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    break;
                }
            }
            console.log("User disconnected:", socket.id);
            broadcastOnlineUsers();
        });
    });
};

export const getSocketId = (userId) => {
    return userSocketMap.get(String(userId));
};

export const getIo = () => io;