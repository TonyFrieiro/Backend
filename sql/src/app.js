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

        let result = await database("products").insert(product)
        messages.push({socketId:data[1],message:data[0]})
        console.log(messages)
        io.emit("messageLog",messages)
    })
})





