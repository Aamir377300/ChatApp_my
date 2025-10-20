import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from 'cors';
import { app, server } from "./lib/socket.js";

connectDB();
const PORT = process.env.PORT;

app.use(express.json({ limit: "8mb" }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get('/', (req, res) => {
    res.send({
        activeStatus: true,
        error: false,
    });
});

app.use((req, res, next) => {
    res.status(404).send({ message: 'Route Not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

server.listen(PORT, () => {
    console.log("Server Running on Port: " + PORT);
});