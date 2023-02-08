import  express  from "express";
const { Router } = express

import {
    carritosDao as apiCars,
    usersDaoMongoDb
    
} from '../daos/index.js'

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


export default carritosRouter