import { Router } from "express";
import {Manager} from "../managers/productos.manager.js"
import productos from "../files/productos.json" assert { type: "json" }
import __dirname from "../utils.js";



const router = Router();
const productosService = new Manager()


// router.get("/",(req,res)=>{
//     res.render("home")
// })

router.get("/",(req,res)=>{
    res.sendFile(__dirname+"/files/index.html")
})


router.get("/productos",async(req,res)=>{

    //no funciona cuando uso el magaer get all pero si los trae por consola

    // const productos = await productosService.getAll()
    
    
    res.render("productos",{
        nombre:"Tony",
        productos,
    })
})

export default router;