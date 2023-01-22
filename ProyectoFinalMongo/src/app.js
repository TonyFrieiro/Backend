import  express  from "express";

const app = express();

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})


const { Router } = express

import {
    productosDao as apiProducts,
    carritosDao as apiCars
    
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
    } else {
        next()
    }
}
//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

productosRouter.get('/', async (req, res) => {
    const productos = await managerP.listarAll()
    res.json(productos)
})

productosRouter.get('/:id', async (req, res) => {
    res.json(await managerP.listar(req.params.id))
})

productosRouter.post('/', permisoAdmin,  async (req, res) => {
    console.log(req.body)
    // timestamp = Date.now();
    res.json({ id: await managerP.guardar(req.body)})
})

productosRouter.put('/:id', permisoAdmin, async (req, res) => {
    res.json(await managerP.actualizar(req.body, req.params.id))
})

productosRouter.delete('/:id', permisoAdmin, async (req, res) => {
    res.json(await managerP.borrar(req.params.id))
})

productosRouter.delete("/",async (req,res)=>{
    res.json(await managerP.borrarAll())
})

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/', async (req, res) => {
    const carritos = await managerC.listarAllCarritos()
    res.json(carritos)
})

carritosRouter.post('/', async (req, res) => {
    let timestamp = Date.now();
    res.json({ id: await managerC.guardarCarrito({ timestamp, productos : req.body }) })
})

carritosRouter.delete('/:id', async (req, res) => {
    res.json(await managerC.borrarCarrito(req.params.id))
})

carritosRouter.get('/:id/productos', async (req, res) => {
    const carrito = await managerC.listarCarrito(req.params.id)
    res.json(carrito)
})

// carritosRouter.post('/:id/productos', async (req, res) => {
//     const carrito = await managerC.listarCarrito(req.params.id)
//     // const producto = await managerP.listar(req.body.id)
//     // carrito.productos.push(producto)
//     await managerC.actualizarCarrito(carrito, req.params.id)
//     // res.end()
// })

// carritosRouter.delete('/:id/productos/:idProd', async (req, res) => {
//     const carrito = await managerC.listar(req.params.id)
//     const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
//     if (index != -1) {
//         carrito.productos.splice(index, 1)
//         await managerC.actualizar(carrito, req.params.id)
//     }
//     res.end()
// })

carritosRouter.delete("/",async (req,res)=>{
    res.json(await managerC.borrarAllCarritos())
})


//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)






