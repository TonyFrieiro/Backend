import  express  from "express";
import nodemailer from "nodemailer"

const { Router } = express

const mailsRouter = new Router()

const transport = nodemailer.createTransport({
    service:"gmail",
    port: 587,
    auth: {
        user: 'tonyfrieiro@gmail.com',
        pass: 'pkedehmynomuvgoh'
    }
})

mailsRouter.post("/register",async(req,res)=>{
    const {firstName, lastName, direccion, edad, telefono, email} = req.body

    const result = await transport.sendMail({
        from:"yo",
        to:"tonyfrieiro@gmail.com",
        subject: `Nuevo registro de cuenta`,
        html:`<div><h1>${(email)}${(firstName)}${(lastName)}${(telefono)}</h1></div>`,
    })
    req.logger.info(`${req.method} en ${req.url} - ${JSON.stringify(result)} se ENVIO el mail`)
    res.send({status:"Succes",message:"Correo enviado!"})
})
mailsRouter.post("/compra",async(req,res)=>{
    const user = JSON.stringify(req.session.user)
    const email = JSON.stringify(req.session.user.email)
    const name = JSON.stringify(req.session.user.name)
    const { productos} = req.body
    const result = await transport.sendMail({
        from:"yo",
        to:"tonyfrieiro@gmail.com",
        subject: `Nuevo Pedido de ${name} (${email})`,
        html:`<div><h1>${(productos)}</h1></div>`,
    })
    req.logger.info(`${req.method} en ${req.url} - ${JSON.stringify(result)} se ENVIO el mail`)
    res.send({status:"Succes",message:"Correo enviado!"})
})



export default mailsRouter