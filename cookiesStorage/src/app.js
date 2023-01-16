import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser("palabracLAVEsECRETA"))

app.get("/",(req,res)=>{
    const valorCookie = {
        a:1,
        b:"c",
        d:true
    }

    res.cookie("cookieMessi",valorCookie).send({status:"succes", message:"Hola Cookie"})
})
app.get("/cookieSpia",(req,res)=>{ //cookiee cifrada espia
    const valorCookie = {
        a:1,
        b:"c",
        d:true
    }
    res.cookie("cookieSpia",valorCookie,{signed:true}).send({status:"succes", message:"secreto shh"})
})
app.get("/analisiSpia",(req,res)=>{ //permite visualizar las cookiees cifradas
    const cokkies = req.signedCookies
    res.send({status:"succes",payload:cokkies})
})
app.get("/cookieSpecial",(req,res)=>{ //cookie que tiene caractaeristicas como tiempo maximo de vida y despues desaaprece
    const otraCookie = "la cuarta"
    res.cookie("cookieMortal",otraCookie,{
        maxAge:10000
    }).send({status:"succes", message:"cookie Mortal seteada"})
})
app.get("/another",(req,res)=>{
    const cookies = req.cookies; //Agarra la informacion de las cookies por req
    res.send({status:"succes",payload:cookies})
})
app.get("/salida",(req,res)=>{  //Borrar una cookie por su nombre
    res.clearCookie("cookieMessi").send({status:"adios"})
})



app.listen(8080,()=>console.log("escuchando..."))