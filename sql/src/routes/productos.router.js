import { Router } from "express";
import { Manager } from "../managers/productos.manager.js";
import __dirname from "../utils.js";
import productos from "../files/productos.json" assert { type: "json" }
import {uploader} from "../utils.js"

const router = Router();

const manager = new Manager();



router.get("/",async(req,res)=>{
    
    await manager.getAll().then((response)=>{
        console.log(response.productos)
    })

    res.send(productos)
})

router.get("/:prodId", async(req,res)=>{
    const id = req.params.prodId

    await manager.getById(id).then((response)=>{
        console.log(response)
    })

    const filter = productos.filter(p => p.id == id)

    if(filter[0]){
        res.send({producto:filter[0]})
    }else{
        res.send({
            status:"error",
            message:"no se encontro el producto"
        }
        )
    }
})




router.post("/",uploader.single("image"),async(req,res)=>{
    const nuevoProducto = req.body
    await manager.save(nuevoProducto).then((response)=>{
        console.log(response)})
    res.send({added:nuevoProducto})
})

router.put("/:prodId", async(req,res)=>{
    const id = req.params.prodId
    const actualizacionProducto = req.body

    let productoPut = productos.filter(p => p.id == id)

    productoPut = actualizacionProducto

    await manager.actualizar(id,actualizacionProducto)

})

router.delete("/:prodId", async(req,res)=>{
    const id = req.params.prodId

    await manager.deleteById(id).then((response)=>{
        console.log(response)
    })
    res.send({
        status:"succes",
        message:"se elimino el producto"
    })
})

export default router

