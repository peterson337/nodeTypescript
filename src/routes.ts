import express from "express";
import cors from "cors";
import db from './db';

const routes = express.Router();


routes.use(cors());


routes.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    })
})


routes.post("/login", (req, res) => {
    const { username, email, password } = req.body;

    const user = {
        username: username,
        email: email,
        password: password,
        id: Date.now(),
    }

   db.create({
     username: user.username,
     email: user.email,
     password: user.password,
     id: user.id
   })
    
})

export default routes;
