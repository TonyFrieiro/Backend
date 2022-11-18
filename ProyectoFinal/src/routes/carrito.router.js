import { Router } from "express";
import { Manager } from "../managers/carrito.manager.js";
import __dirname from "../utils.js";

import carritos from "../files/carrito.json" assert { type: "json" }

let administrador = true

const router = Router();

const manager = new Manager();

router.post("/",async(req,res)=>{
    const nuevoCarrito = req.body
    await manager.save(nuevoCarrito).then((response)=>{
        console.log(response)})
    res.send({added:nuevoCarrito})

})

router.delete ("/:id", async(req,res)=>{
    const id = req.params.id

    await manager.deleteById(id).then((response)=>{
        console.log(response)
    })
    res.send({
        status:"succes",
        message:"se elimino el carrito"
    })
})

router.get("/:id", async(req,res)=>{
    const id = req.params.id

    await manager.getById(id).then((response)=>{
        console.log(response)
    })

    const filter = carritos.filter(c => c.id == id)

    if(filter[0]){
        res.send({carrito:filter[0]})
    }else{
        res.send({
            status:"error",
            message:"no se encontro el carrito"
        }
        )
    }
})

router.post("/:id/productos",async(req,res)=>{
    const id = req.params.id
    const nuevoProducto = req.body
    await manager.saveProducto(id,nuevoProducto).then((response)=>{
        console.log(response)})
    res.send({added:nuevoProducto})
})

router.delete ("/:id/productos/:idProd", async(req,res)=>{
    const idCarrito = req.params.id
    const idProd = req.params.idProd
 
    await manager.deleteProductoById(idCarrito,idProd).then((response)=>{
        console.log(response)
    })
    res.send({
        status:"succes",
        message:"se elimino el producto del carrito"
    })
})














export default router