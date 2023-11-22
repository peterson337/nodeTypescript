import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dbSchema = new Schema({
    username: String,
    email: String,
    password: String,
    dataHora: Number,
})


const db = mongoose.model("users", dbSchema);

export default db;