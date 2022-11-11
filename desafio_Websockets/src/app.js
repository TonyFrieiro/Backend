import express from "express"
import {Server, Socket} from "socket.io"
import __dirname from "./utils.js";
import handlebars from "express-handlebars"


const app = express();
const server = app.listen(8080,()=>console.log("listening"))

app.engine("handlebars",handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","handlebars")

app.use(express.json())
app.use(express.static(__dirname+"/public"));

const io = new Server(server)

app.get("/",(req,res)=>{
    res.render("home")
})

const messages =[]

io.on("connection",socket=>{
    console.log("socket conectado")

    socket.on("message",data=>{
        messages.push({socketId:socket.id,message:data})
        console.log(data)
        io.emit("messageLog",messages)
    })
})