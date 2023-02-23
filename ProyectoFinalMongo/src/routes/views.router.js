import {Router} from "express"
import viewsController from "../controllers/views.controller.js"


const router = Router()

const sessionValidator = (req,res,next) =>{
    if (req.session.user == undefined) {
        // redirige a login
        res.render("login")
    }else{
        next()
    }
}

const sessionAdminValidator = (req,res,next) =>{
    if (req.session.user.role != "admin") {
        // redirige a productos
        res.render("productos")
    }else{
        next()
    }
}



router.get("/",viewsController.register)
router.get("/login",viewsController.login)
router.get("/logout",sessionValidator,viewsController.logout)
router.get("/productos",sessionValidator ,viewsController.productos)
router.get("/ingresoProductos",sessionValidator,sessionAdminValidator,viewsController.ingresoProductos)

export default router