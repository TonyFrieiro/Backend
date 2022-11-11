import  express  from "express";
import handlebars from "express-handlebars"
import {Server, Socket} from "socket.io"
import productosRouter from "./routes/productos.router.js"
import viewsRouter from "./routes/views.router.js"
import productos from "./files/productos.json" assert { type: "json" }

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

io.on("connection",socket=>{
    socket.emit("productos", productos)

    //Websockets CHAT
    socket.on("nombre",function(data){
        nombres = data
        io.emit("messageLog",nombres)
    })
    socket.on("chat",function(data){
        console.log(data)
        messages.push({socketId:data[1],message:data[0]})
        console.log(messages)
        io.emit("messageLog",messages)
    })
})





