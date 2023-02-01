let productosDao
let carritosDao

import ProductosDaoMongoDb from './productos/productosDaoMongoDb.js'
import CarritosDaoMongoDb from './carritos/carritosDaoMongoDb.js'
import usersDaoMongoDb from "./User.dao.js"



let variable = "M"

if (variable == "M"){
    productosDao = ProductosDaoMongoDb
    carritosDao = CarritosDaoMongoDb
}






export { productosDao, carritosDao, usersDaoMongoDb }