import express from "express";
import {createServer} from "node:http";
import mongoose from "mongoose";
import connectToSocket from "./controllers/socketManager.js"
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("PORT", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended: true}));

const start = async () => {
    app.set("mongo_User")
    const connectDB = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB is Connectedby host : ${connectDB.connection.host}`)

    server.listen(app.get("PORT"), ()=>{
        console.log(`Server Running on port ${app.get("PORT")}`)
    })
}

start();