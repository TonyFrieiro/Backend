import  express  from "express";
import session from "express-session"

const app = express()

app.use(express.json())
app.use(session({
    secret:"codersession",
    resave:true,
    saveUninitialized:true
}))

app.get("/",(req,res)=>{
    res.send({status:"succes", message:"todo ready"})
})

app.post("/login",(req,res)=>{
    const {email, password} = req.body
    //validamos al usuario AQUI <----------------
    if (email=="correomessi"&& password == "tercera"){
        const user ={
            name: "Lionel",
            lastName: "Messi",
            email,
            role: "student",
            age: "36",
            password
        }
        req.session.user = {
            name: `${user.name} ${user.lastName}`,
            role: `${user.role}`
        }
        res.send("logueado")
    }else{
        res.status(400).send("credenciales incorrectas")
    }
})

app.get("/profile", (req,res)=>{
    res.send(req.session.user)
})

//Midleware
const validateStudent = (req,res,next)=>{
    if (!req.session.user) return res.status(401).send({status:"error",error:"no identificado"})
    if (req.session.user.role!=="student") return res.status(403).send({status:"error", error:"no autorizado"})
    next()
}
app.get("/infoEstudiantil", validateStudent,(req,res)=>{
    res.send("Esto solo lo deberia ver un estudiante")
})

app.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if (err) return res.status(500).send("no pude cerrar sesion")
    })
    res.send("deslogueado")
})







app.listen(8080,()=>{console.log("Listening...")})