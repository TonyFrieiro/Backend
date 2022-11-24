import express from "express";
import database from "./db/knex.js"

const app = express()
const server = app.listen(8080,()=>console.log("listening on port 8080"))


const users = [
    {first_name:"Tony",last_name:"Frieiro",email:"tonyfrieiro@gmail.com",age:19,gender:"male"},
    {first_name:"Lionel",last_name:"Messi",email:"leomessi@gmail.com",age:35,gender:"male"},
    {first_name:"Julian",last_name:"Alvarez",email:"julianalvarez@gmail.com",age:21,gender:"male"},
    {first_name:"Cristiano",last_name:"Ronaldo",email:"cr7@gmail.com",age:37,gender:"male"}
]

app.get("/",async(req,res)=>{
    let result = await database("users").select("*")
    console.log(result)
    res.send({result})
})

app.get("/users",async(req,res)=>{
    let result = await database("users").insert(users)
    res.send({result})
})