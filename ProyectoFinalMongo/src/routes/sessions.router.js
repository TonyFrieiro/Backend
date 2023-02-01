import {Router} from "express"
// import sessionsController from "../controllers/sessions.controller.js"
import passport from "passport"
const router = Router()

// router.post("/register",sessionsController.register)
// router.post("/login",sessionsController.login)
// router.post("/logout",sessionsController.logout)

router.post("/register",passport.authenticate("register",{failureRedirect:"api/sessions/failedRegister"}), async(req,res)=>{
    const user = req.user
    res.send({status:"succes",payload:user._id})
})
router.get("/failedRegister",(req,res)=>{
    req.logger.error(`${req.method} en ${req.url} -  !!! PASSPORT FALLO `)
    res.status(500).send({status:"error",error:"Error de passport"})
})
router.post("/login",passport.authenticate("login"), async(req,res)=>{
    req.session.user = {
        name: `${req.user.firstName} ${req.user.lastName}`,
        email:req.user.email,
        role: req.user.role
    }
    res.send({status:"succes",message:"logueado!"})
})

router.get("/user", async (req, res) => {
    return res.send(req.session.user)
})
 
router.get("/logout", async (req, res) => {
    
    req.session.destroy(error => {
        if (error) {
            req.logger.fatal(`${req.infoPeticion} | No se pudo cerrar sesión | ${error}`)
            return res.status(500).send({ status: "error", message: "No se pudo cerrar sesión" })
        }
    })
    return res.send({ status: "success", message: "Deslogueado" })
})
export default router