import express, { urlencoded } from "express";

import productosRouter from "./routes/productos.router.js"

import {Manager} from "./manager.js"

import __dirname from "./utils.js";

const app = express()  //iniciar el aplicativo

const server = app.listen(8080,()=>console.log("listening on express"))  //poner el aplicativo a escuchar

app.use(express.json())

app.use(express.static(__dirname +"/public"))

app.use(express.urlencoded({extended:true}))


//// Desafio Servidor con express

app.use("/api/productos",productosRouter)



