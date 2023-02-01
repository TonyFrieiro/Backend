import  express  from "express";
import {addLogger} from "./utils/logger.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import config from "./config/config.js"
import mongoose from "mongoose";
import cookieParser from "cookie-parser"


/////passport
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
////passport

const app = express();
app.use(addLogger)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

/////////////////////PASSPORT

app.use(session({
    store:MongoStore.create({
        mongoUrl: `mongodb+srv://tony:totito12@codercluster.kxaklqz.mongodb.net/proyecto2?retryWrites=true&w=majority`,
        ttl:1000
    }),
    secret:"ajsdj4rt54t",
    saveUninitialized:false,
    resave:false,
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


/// poniendo handlebars como manejador de vistas

app.engine("handlebars",handlebars.engine())
app.set(`views`,`${__dirname}/views`)
app.set("view engine","handlebars")

app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.use(cookieParser())

app.use("/",viewsRouter)
app.use("/api/sessions",sessionsRouter)


// const connection = mongoose.connect(config.mongo.URL)

const connection = mongoose.connect(`mongodb+srv://tony:totito12@codercluster.kxaklqz.mongodb.net/proyecto2?retryWrites=true&w=majority`)

// `mongodb+srv://tony:totito12@codercluster.kxaklqz.mongodb.net/proyecto2?retryWrites=true&w=majority`





const { Router } = express

import {
    productosDao as apiProducts,
    carritosDao as apiCars,
    usersDaoMongoDb
    
} from './daos/index.js'

// import apiProducts from "./daos/productos/productosDaoMongoDb.js"
// import apiCars from "./daos/carritos/carritosDaoMongoDb.js"

let managerP = new apiProducts
let managerC = new apiCars


const Admin = true

function errorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

function permisoAdmin(req, res, next) {
    if (!Admin) {
        res.json(errorNoEsAdmin())
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()} !!! No autorizado `)
    } else {
        next()
    }
}
//--------------------------------------------
// configuro router de productos


const productosRouter = new Router()

/////////////////////////////////////////////

let productosLista =  await managerP.listarAll()
let contenido2 =  JSON.stringify(productosLista)
let contenido = JSON.parse(contenido2) 
export {contenido}

//////////////////////////////////////////////

productosRouter.get('/', async (req, res) => {
    const productos = await managerP.listarAll()
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await managerP.listar(req.params.id))
})

productosRouter.post('/', permisoAdmin,  async (req, res) => {
    req.logger.info(`${req.method} en ${req.url} - ${JSON.stringify(req.body)} se Guardo producto`)
    res.json({ id: await managerP.guardar(req.body)})
})

productosRouter.put('/:id', permisoAdmin, async (req, res) => {
    res.json(await managerP.actualizar(req.body, req.params.id))
})

productosRouter.delete('/:id', permisoAdmin, async (req, res) => {
    req.logger.warn(`${req.method} en ${req.url} - ${JSON.stringify(req.params)} se ELIMINO producto`)
    res.json(await managerP.borrar(req.params.id))
})

productosRouter.delete("/",async (req,res)=>{
    req.logger.warn(`${req.method} en ${req.url} -  se ELIMINARON todos los productos`)
    res.json(await managerP.borrarAll())
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/', async (req, res) => {
    const carritos = await managerC.listarAllCarritos()
    res.json(carritos)
})

// import {obtenerUser} from "./public/js/userCarrito.js"

carritosRouter.post('/', async (req, res) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const time = hoy.toDateString()
    req.logger.info(`${req.method} en ${req.url} - ${JSON.stringify(req.body)} se GUARDO el Carrito`)
    res.json({ id: await managerC.guardarCarrito({ timestamp: time, productos : req.body, user:req.session.user}) })
})

carritosRouter.delete('/:id', async (req, res) => {
    req.logger.warn(`${req.method} en ${req.url} - ${JSON.stringify(req.params)} se ELIMINO carrito`)
    res.json(await managerC.borrarCarrito(req.params.id))
})

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await managerC.listarCarrito(req.params.id)
    res.json(carrito)
})

carritosRouter.delete("/",async (req,res)=>{
    req.logger.warn(`${req.method} en ${req.url} -  se ELIMINARON todos los carritos`)
    res.json(await managerC.borrarAllCarritos())
})


////////////////////////////////////////////      EMAIL

import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service:"gmail",
    port: 587,
    auth: {
        user: 'tonyfrieiro@gmail.com',
        pass: 'pkedehmynomuvgoh'
    }
})

app.post("/mail",async(req,res)=>{
    const {firstName, lastName, direccion, edad, telefono, email} = req.body

    const result = await transport.sendMail({
        from:"yo",
        to:"tonyfrieiro@gmail.com",
        subject: `Nuevo registro de cuenta`,
        html:`<div><h1>${(email)}${(firstName)}${(lastName)}${(telefono)}</h1></div>`,
    })
    req.logger.info(`${req.method} en ${req.url} - ${JSON.stringify(result)} se ENVIO el mail`)
    res.send({status:"Succes",message:"Correo enviado!"})
})
app.post("/mailCompra",async(req,res)=>{
    const {user, productos} = req.body
    const result = await transport.sendMail({
        from:"yo",
        to:"tonyfrieiro@gmail.com",
        subject: `Nuevo Pedido de ${user}`,
        html:`<div><h1>${(productos)}</h1></div>`,
    })
    req.logger.info(`${req.method} en ${req.url} - ${JSON.stringify(result)} se ENVIO el mail`)
    res.send({status:"Succes",message:"Correo enviado!"})
})



///////////////////////////////////////////


//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)






