import express from "express"
import mongoose from "mongoose"
import handlebars from "express-handlebars"
import session from "express-session"
import MongoStore from "connect-mongo"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js"


const app = express()
const connection = mongoose.connect("mongodb+srv://tony:totito12@codercluster.kxaklqz.mongodb.net/galeria?retryWrites=true&w=majority")


import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access'



app.engine("handlebars",handlebars.engine())
app.set("views",__dirname +"/views")
app.set("view engine","handlebars")

app.use(session({
    store:MongoStore.create({
        mongoUrl: "mongodb+srv://tony:totito12@codercluster.kxaklqz.mongodb.net/galeria?retryWrites=true&w=majority",
        ttl:100
    }),
    secret:"ajsdj4rt54t",
    saveUninitialized:false,
    resave:false
}))

const { Router } = express

app.use(express.json())
app.use(express.static(__dirname+"/public"))

app.use("/",viewsRouter)
app.use("/api/sessions",sessionsRouter)

app.listen(8080, ()=> console.log("Listening.."))







//////////////////////////////////////////////////////////////////////////////////

import ContenedorMongoDb from "./manager/productos.manager.js"

let manager = new ContenedorMongoDb()


const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    const productos = await manager.listarAll()
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await manager.listar(req.params.id))
})

productosRouter.post('/', async (req, res) => {
    console.log(req.body)
    // timestamp = Date.now();
    res.json({ id: await manager.guardar(req.body)})
})

productosRouter.put('/:id', async (req, res) => {
    res.json(await manager.actualizar(req.body, req.params.id))
})

productosRouter.delete('/:id', async (req, res) => {
    res.json(await manager.borrar(req.params.id))
})

//--------------------------------------------
// configuro router de carritos

// const carritosRouter = new Router()

// carritosRouter.get('/', async (req, res) => {
//     res.json((await apiCars.listarAll()).map(c => c.id))
// })

// carritosRouter.post('/', async (req, res) => {
//     timestamp = Date.now();
//     res.json({ id: await apiCars.guardar({ timestamp, productos: [] }) })
// })

// carritosRouter.delete('/:id', async (req, res) => {
//     res.json(await apiCars.borrar(req.params.id))
// })

// carritosRouter.get('/:id/productos', async (req, res) => {
//     const carrito = await apiCars.listar(req.params.id)
//     res.json(carrito.productos)
// })

// carritosRouter.post('/:id/productos', async (req, res) => {
//     const carrito = await apiCars.listar(req.params.id)
//     const producto = await apiProducts.listar(req.body.id)
//     carrito.productos.push(producto)
//     await apiCars.actualizar(carrito, req.params.id)
//     res.end()
// })

// carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
//     const carrito = await apiCars.listar(req.params.id)
//     const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
//     if (index != -1) {
//         carrito.productos.splice(index, 1)
//         await apiCars.actualizar(carrito, req.params.id)
//     }
//     res.end()
// })


app.use('/api/productos', productosRouter)
// app.use('/api/carritos', carritosRouter)
app.use(express.urlencoded({ extended: true }))