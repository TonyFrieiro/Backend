import express from "express";
import moment from "moment"

import {Manager} from "./manager.js"

const manager = new Manager();

import productos from "../productos.json" assert { type: "json" }

const app = express()  //iniciar el aplicativo

const server = app.listen(8080,()=>console.log("listening on express"))  //poner el aplicativo a escuchar

//  ENDPOINTS

let contador = 0;

app.get("/",(req,res)=>{
    res.send(`<h1 style="color:blue;"> Bienvenidos al servidor express</h1>`)
})

app.get("/visitas",(req,res)=>{
    contador++;
    res.send(`La cantidad de visitas es: ${contador}`)
})

app.get("/fyh",(req,res)=>{
    
    res.send({fyh:moment().format("DD/MM/YY hh:mm:ss")})
})

// req.query solo funciona con simbolo de interrogacion (?)
// los querys son mas opcionales a diferecia de los params que son obligatorios(sino no se encuntrea la ruta = no funciona)
app.get("/saludar",(req,res)=>{
    const {nombre ="usuario", edad} = req.query
    //req.query
    console.log(req.query)
    //http://localhost:8080/saludar?nombre=Tony&edad=19
    res.send(`hola ${nombre}, tienes ${edad} años`)
})

const users =[
    {id:1,nombre:"Tony",edad:19},
    {id:2,nombre:"Messi",edad:34},
    {id:3,nombre:"apache",edad:38}
]



app.get("/users",(req,res)=>{

    res.send({users:users})
})
app.get("/users/:userId",(req,res)=>{
    //http://localhost:8080/users/3
    const id = req.params.userId
    const filter = users.filter(u => u.id == id)
    if(filter[0]){
        res.send({user:filter[0]})
    }else{
        res.send({
            status:"error",
            message:"no se encontro el ususario"
        }

        )
        
    }
    res.send()

})

//// Desafio Servidor con express


app.get("/productos/",async(req,res)=>{
    
    await manager.getAll().then((response)=>{
        console.log(response.productos)
    })

    res.send(productos)
})

app.get("/productos/:prodId", async(req,res)=>{
    const id = req.params.prodId

    await manager.getById(id).then((response)=>{
        console.log(response)
    })

    const filter = productos.filter(p => p.id == id)

    if(filter[0]){
        res.send({producto:filter[0]})
    }else{
        res.send({
            status:"error",
            message:"no se encontro el producto"
        }
        )
    }
})

