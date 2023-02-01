import express from "express"
import nodemailer from "nodemailer"
import twilio from "twilio"

const app = express()
const PORT = process.env.PORT || 8080

//MAILING

const transport = nodemailer.createTransport({
    service:"gmail",
    port: 587,
    auth: {
        user: 'tonyfrieiro@gmail.com',
        pass: 'pkedehmynomuvgoh'
    }
})

app.get("/mail",async(req,res)=>{
    const result = await transport.sendMail({
        from:"yo",
        to:"tonyfrieiro@gmail.com",
        subject: "Prueba",
        html:`<div><h1>Lo logre !!!</h1></div>`,
        attachments:[
            {
                filename:"CV-TonyFrieiro.pdf",
                path:"./src/docs/CV-FrieiroTony.pdf"
            }
        ]
    })
    console.log(result)
    res.send({status:"Succes",message:"Correo enviado!"})
})


//TWILIO

const twilioAcount = "ACe64d3311b67098f4dec76d124619dccc"
const twilioSecret = "057737edff0197c73c2a692da1b91251"
const twilioNumber = "+16812023297"


app.get("/sms",async (req,res)=>{
    const result = await twilioClient.messages.create({
        body:"mensaje desde twilio",
        from: twilioNumber,
        to:"+541154011811"
    })
    console.log(result)
    res.send({status:"Succes",message:"sms enviado!"})
})

const twilioClient = twilio(twilioAcount,twilioSecret)

//WhatsApp

app.get("/whatsapp",async(req,res)=>{
    const result = await twilioClient.messages.create({
        from:"whatsapp:+14155238886",
        to:"whatsapp:+5491154011811",
        body:"segundo mensaje de whatsApp twilio",
        mediaUrl:["https://www.google.com/search?q=messi+con+la+del+mundo&sxsrf=AJOqlzXsYdkGXJlWdwrbfXusPBPjVxdt0g:1674670207229&source=lnms&tbm=isch&sa=X&ved=2ahUKEwibjcXWqOP8AhVJGbkGHRKbDOkQ_AUoAXoECAEQAw&biw=1360&bih=635&dpr=1#imgrc=ESI3qFrXgFT9CM"]
    })
    console.log(result)
    res.send({status:"Succes",message:"whatsapp enviado!"})
})


app.listen(PORT,()=>console.log("Escuchando..."))