import  express  from "express";
import handlebars from "express-handlebars"
import {Server, Socket} from "socket.io"
import productosRouter from "./routes/productos.router.js"
import viewsRouter from "./routes/views.router.js"
import productos from "./files/productos.json" assert { type: "json" }

import knex from "knex"
import {Manager} from "./managers/productos.manager.js"
import database from "./knex/knex.js"

import __dirname from "./utils.js";


import { generateProduct } from "./faker.js";

import mongoose from "mongoose"
import mensajesModel from "./models/mensajes.js";


const URL = "mongodb://127.0.0.1:27017/normalizr"

const connection = mongoose.connect(URL,(error)=>{
    if(error) console.log("hubo un error:"+error);
    else console.log("conectado a monguito");
})


const app = express();

//Motor de plantillas


//Registro
app.engine("handlebars",handlebars.engine());
//Conectar con carpeta vistas
app.set("views",__dirname+"/views");
//Activo el motor registrado
app.set("view engine","handlebars");

app.use(express.static(__dirname +"/files"))

app.use(express.urlencoded({extended:true}))

app.use(express.json());
app.use("/",viewsRouter);
app.use("/api/productos",productosRouter)


const server = app.listen(8080,()=>console.log("Listening"));

//WEBSOCKETS LISTA PRODUCTOS

const io = new Server(server)

const messages =[]

let nombres = ""



const manager = new Manager

app.post("/insertar",async(req,res)=>{
    const nuevoProducto = req.body
    await manager.save(nuevoProducto).then((response)=>{
        console.log(response)})
    res.send({added:nuevoProducto})
})
app.put("/update/:id",async(req,res)=>{
    const id = req.params.id
    const updateProducto = req.body
    let campo = updateProducto.campo
    let valor = updateProducto.valor

    await manager.actualizar(id,campo,valor).then((response)=>{
        console.log(response)
    })
    res.send({updated: updateProducto})

})
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id

    await manager.deleteById(id).then((response)=>{
        console.log(response)
    })
    res.send("product deleted")
})


import {normalize, schema} from "normalizr"
let mensajes = await mensajesModel.find()
// console.log(mensajes)

const post = {
    id:"mensajes",
    comments:[
        {
            id: 1,
            author:{
                id:1,
                name:"Tony",
                email:"tony@gmail.com",
                edad:19,
                img:"tony.png"
            },
            content:"hola como va"
        },
        {
            id: 2,
            author:{
                id:2,
                name:"Arim",
                email:"Arim@gmail.com",
                edad:19,
                img:"arim.png"
            },
            content:mensajes[1].mensaje
        },
        {
            id: 3,
            author:{
                id:1,
                name:"Tony",
                email:"tony@gmail.com",
                edad:19,
                img:"tony.png"
            },
            content:mensajes[2].mensaje
        }
    ]
}

const user = new schema.Entity("users")
const comment = new schema.Entity("mensajes",{
    author:user
})

// const postEntity = new schema.Entity("posts",{
//     author:user,
//     message:[comment]
// })

const normalizedData = normalize(post,comment)

console.log(JSON.stringify(normalizedData,null,"\t"))

console.log(`Longitud original: ${JSON.stringify(post).length}`)
console.log(`Longitud normalized: ${JSON.stringify(normalizedData).length}`)



io.on("connection",async socket=>{

    let result = await database("products").select("*")
    console.log(result)

    socket.emit("productos", result)

    //Websockets CHAT
    socket.on("nombre",function(data){
        nombres = data
        io.emit("messageLog",nombres)
    })
    socket.on("chat",async function(data){
        console.log(data)
        let mensaje = data[0]
        let nombre = data[1]
        const newMensaje =  {nombre,mensaje}
        let insertResult = await mensajesModel.create(newMensaje)
        console.log(insertResult)




        // let result = await database("products").insert(data)
        messages.push({nombre,mensaje})
        console.log(messages)
        io.emit("messageLog",messages)
    })
})


//desafio Faker







app.get("/api/productos-test",async(req,res)=>{
    let productos = []
    for (let i = 0; i < 5; i++) {
        productos.push(generateProduct());
    }

    res.render("faker",{
        productos
    })
})






