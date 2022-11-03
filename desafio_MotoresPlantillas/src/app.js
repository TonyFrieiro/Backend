import  express  from "express";
import handlebars from "express-handlebars"

import productosRouter from "./routes/productos.router.js"
import viewsRouter from "./routes/views.router.js"

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

