import mongoose from "mongoose"

import productosModel from "./ContenedorMongo/models/productos.js"

import carritosModel from "./ContenedorMongo/models/carritos.js";



const connection = mongoose.connect("mongodb+srv://tony:totito12@codercluster.kxaklqz.mongodb.net/proyecto?retryWrites=true&w=majority",err=>{
    if(err)console.log(err)
    else console.log("base conectada")
});

const ProductosCRUD = async()=>{
    productosModel.create({ nombre: "taza", descripcion: " Soy una taza ", foto: "urlTAAZA", precio: 1200, stock: 100},{ nombre: "cuchara", descripcion: " Soy una cuchara ", foto: "urlCuchara", precio: 200, stock: 50},{ nombre: "camara", descripcion: " Soy una camara ", foto: "urlCamara", precio: 23000, stock: 20},{ nombre: "plato", descripcion: " Soy un plato ", foto: "urlPLato", precio: 500, stock: 30})

}

const CarritoCRUD = async() =>{
    carritosModel.create({ productos: ["taza","plato"], time: Date.now().toString()},{ productos: ["plato"], time: Date.now().toString()})
}
CarritoCRUD()
ProductosCRUD()
