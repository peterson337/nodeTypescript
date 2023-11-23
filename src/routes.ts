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
    const post = await User.find();

    const loading = true;

    res.json({
        post: post,
        loading: loading,
    })
})

routes.get("/usersDetails/:slug", async (req, res) => {

    let loading = true;

    const id = req.params.slug 
    
    const post = await User.findOneAndUpdate({_id: id}, {new: true}).then((postRes) => {

        loading = false;

         res.json({
             postRes: postRes, loading: loading
         })

    })

})

routes.post("/createLogin", (req, res) => {
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

   res.json({
    username:user.username,
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
 
 res.json({
     sucess: true,
 })


})

routes.put("/updateUser/:id", async (req, res) => {

    const id = req.params.id;

    const {  userName: userName, email: email, password: password, cargo: cargo} = req.body;

    const user = {
        userName: userName,
        email: email,
        password: password,
        cargo: cargo,
    }

        
      User.updateOne({_id: id}, {
        $set: {
            username: user.userName,
            email: user.email,
            password: user.password,
            cargo: user.cargo,
        }
      }, {new: true}).then((postRes) => {
        
          res.json({
              sucess: true,
          })
      })


})

routes.delete("/deleteUser/:id", async (req, res) => {

    
    const id = req.params.id;
    
    console.log(id);
    
    await User.findOneAndDelete({_id: id}).then(() => {
        res.json({
            deleteUser: true,
        })
    })


})

export default routes;
