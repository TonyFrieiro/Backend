let productosDao
let carritosDao

import ProductosDaoMongoDb from './productos/productosDaoMongoDb.js'
import CarritosDaoMongoDb from './carritos/carritosDaoMongoDb.js'

import ProductosDaoArchivo from "./productos/productosDaoArchivo.js"
import CarritosDaoArchivo from "./carritos/carritosDaoArchivo.js"


let variable = "M"

if (variable == "M"){
    productosDao = ProductosDaoMongoDb
    carritosDao = CarritosDaoMongoDb
}
if (variable == "A"){
    productosDao = ProductosDaoArchivo
    carritosDao = CarritosDaoArchivo
}





export { productosDao, carritosDao }