import  express  from "express";
const { Router } = express

import {
    productosDao as apiProducts,
    usersDaoMongoDb
    
} from '../daos/index.js'

let managerP = new apiProducts



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

const productosRouter = new Router()

/////////////////////////////////////////////

// let productosLista =  await managerP.listarAll()
// let contenido2 =  JSON.stringify(productosLista)
// let contenido = JSON.parse(contenido2) 
// export {contenido}

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

export default productosRouter