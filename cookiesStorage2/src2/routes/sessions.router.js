import { Router } from "express";
import userModel from "../models/User.js"

const router = Router()

router.post("/register",async(req,res)=>{
    const {firstName, lastName, email, password} = req.body
    if(!firstName || !lastName || !email || !password) return res.status(400).send({status:"error",error:"faltan valores"})
    const exists = await userModel.findOne({email})
    if(exists) return res.status(400).send({status:"error",error:"El ususario ya existe"})
    const user = {
        firstName,
        lastName,
        email,
        password
    }
    const result = await userModel.create(user)
    res.send({status:"succes",payload:result._id})
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password) return res.status(400).send({status:"error",error:"faltan valores"})
    const user = await userModel.findOne({email,password})
    if(!user) return res.status(400).send({status:"error",error:"usuario o contraseña incorrectas"})
    req.session.user = {
        name: `${user.firstName} ${user.lastName}`,
        email:user.email,
        role: user.role
    }
    res.send({status:"succes",message:"logueado!"})
    
})

export default router