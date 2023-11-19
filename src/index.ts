import express from "express";
import cors from "cors";
import http from "http";
import routes from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(`mongodb+srv://User:${process.env.KEY}@cluster1.9yvxty2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`)
.then(() => console.log("MongoDB connected"))
const app = express();
app.use(express.json());
app.use(routes);

const server = http.createServer(app);

server.listen(5000, () => {
    console.log("Server running on port 5000");
})