// import userModel from "../daos/User.dao.js"
// import { createHash, validatePassword } from "../utils.js"
// import jwt from "jsonwebtoken"
// import config from "../config/config.js"
// const register = async (req,res)=>{
//     const {firstName,lastName,email,password} = req.body
//     if(!firstName || !lastName || !email || !password)return res.status(400).send({status:"error",error:"incomplete values"})
//     const exists = await userModel.findOne({email})
//     if(exists)return res.status(400).send({status:"error",error:"User ya existe"})
//     const hashedPassword = await createHash(password)
//     const user = {
//         firstName,
//         lastName,
//         email,
//         password:hashedPassword,
//     }
//     const result = await userModel.create(user)
//     res.send({status:"Succes",payload:result._id})
// }

// const login = async (req,res)=>{
//     const {email,password} = req.body
//     if(!email || !password)return res.status(400).send({status:"error",error:"incomplete values"})
//     const user = await userModel.findOne({email})
//     if(!user)return res.status(400).send({status:"error",error:"User no existe"})
//     const isValidPassword = await validatePassword(user,password)
//     if(!isValidPassword)return res.status(400).send({status:"error",error:"User no existe"})
//     const tokenizedUser = {
//         id:user._id,
//         role:user.role,
//         name: user.firstName
//     }
//     //Tuve que hardcodear  el SECRET porque no me lo reconocia
//     const token = jwt.sign(tokenizedUser,"config.jwt.SECRET",{expiresIn:"1d"})
//     res.cookie(config.jwt.COOKIE,token).send({status:"Succes",message:"Logueado !!"})
// }

// const logout = async (req,res)=>{
//     console.log(req.session.user)
//     res.clearCookie("CookieLoginUser",{path: '/', domain: 'localhost'}.send())
//     // El logout no funciona
// }

// export default {
//     login,
//     register,
//     logout
// }