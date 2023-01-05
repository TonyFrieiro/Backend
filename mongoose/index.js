import mongoose from "mongoose"

import productosModel from "./models/productos.js";


const URL = "mongodb://127.0.0.1:27017/proyecto"

const connection = mongoose.connect(URL,(error)=>{
    if(error) console.log("hubo un error:"+error);
    else console.log("conectado a monguito");
})



const productosInsertar = [
    { nombre: "taza", descripcion: " Soy una taza ", foto: "urlTAAZA", precio: 1200, stock: 100},
    { nombre: "lapiz", descripcion: " Soy un lapiz ", foto: "urlLAPIZ", precio: 120, stock: 80},
    { nombre: "camara", descripcion: " Soy una camara ", foto: "urlCAMARa", precio: 4800, stock: 30},
    { nombre: "perfume", descripcion: " Soy un perfume", foto: "urlPerfume", precio: 3200, stock: 50},
    { nombre: "cuaderno", descripcion: " Soy un cuaderno ", foto: "urlCuaderno", precio: 800, stock: 40}
]

const CRUD = async()=>{

    //INSERT MANY
    // let insertResult = await productosModel.insertMany(productosInsertar)
    // console.log(insertResult)

    //INSERT ONE
    // const newProducto =  { nombre: "libro", descripcion: " Soy un libro ", foto: "urlLibro", precio: 1800, stock: 20}
    // let insertResult = await productosModel.create(newProducto)
    // console.log(insertResult)

    //FIND
    // let produtos = await productosModel.find()
    // console.log(produtos)

    //UPDATE
    // let result = await productosModel.updateOne({nombre:"libro"},{$set:{precio:400}})
    // console.log(result)

    //DELETE
    // let result = await productosModel.deleteOne(({nombre:"libro"}))
    // console.log(result)
}


CRUD()