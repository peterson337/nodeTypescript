import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    cargo: String,
    dataHora: Number,
})


const User = mongoose.model("CreateUsers", UserSchema);

export default User;