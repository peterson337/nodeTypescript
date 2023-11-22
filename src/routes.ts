import express from "express";
import cors from "cors";
import db from './db';
import User from './User';

const routes = express.Router();


routes.use(cors());



routes.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    })
})

routes.get("/users", async (req, res) => {
    const post = await db.find();

    res.json({
        post: post
    })
})

routes.get("/usersDetails/:slug", async (req, res) => {

    let loading = true;

    const id = req.params.slug 
    
    const post = await db.findOneAndUpdate({_id: id}, {new: true}).then((postRes) => {

        loading = false;

         res.json({
             postRes: postRes, loading: loading
         })

    })

})

routes.post("/login", (req, res) => {
    const { username, email, password, dataHora } = req.body;
        
    const user = {
        username: username,
        email: email,
        password: password,
        dataHora: new Date(),
    }

   db.create({
     username: user.username,
     email: user.email,
     password: user.password,
     id: user.dataHora
   })
    
})

routes.post("/createUser", (req, res) => {
const {  username: username, email: email, password: password, cargo: cargo} = req.body;

const user = {
    username: username,
    email: email,
    password: password,
    cargo: cargo,
}

 User.create({
  username: user.username,
  email: user.email,
  password: user.password,
  cargo: user.cargo,
 })


})

export default routes;
