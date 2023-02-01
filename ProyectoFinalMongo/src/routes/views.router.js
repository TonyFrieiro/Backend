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

router.get("/",viewsController.register)
router.get("/login",viewsController.login)
router.get("/logout",sessionValidator,viewsController.logout)
router.get("/productos",sessionValidator ,viewsController.productos)
router.get("/ingresoProductos",sessionValidator,viewsController.ingresoProductos)

export default router