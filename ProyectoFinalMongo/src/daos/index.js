let productosDao
let carritosDao

import ProductosDaoMongoDb from './productos/productosDaoMongoDb.js'
import CarritosDaoMongoDb from './carritos/carritosDaoMongoDb.js'

import ProductosDaoArchivo from "./productos/productosDaoArchivo.js"
import CarritosDaoArchivo from "./carritos/carritosDaoArchivo.js"

import ProductosDaoFirebase from "./productos/productosDaoFirebase.js"
import CarritosDaoFirebase from "./carritos/carritosDaoFirebase.js"


let variable = "M"

if (variable = "M"){
    productosDao = new ProductosDaoMongoDb()
    carritosDao = new CarritosDaoMongoDb()
}
if (variable = "A"){
    productosDao = ProductosDaoArchivo
    carritosDao = CarritosDaoArchivo
}
if (variable = "F"){
    productosDao = ProductosDaoFirebase
    carritosDao = CarritosDaoFirebase
}


// switch (process.env.PERS) {
//     case 'json':
//         const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
//         const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')

//         productosDao = new ProductosDaoArchivo()
//         carritosDao = new CarritosDaoArchivo()
//         break
//     case 'firebase':
//         const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
//         const { default: CarritosDaoFirebase } = await import('./carritos/CarritosDaoFirebase.js')

//         productosDao = new ProductosDaoFirebase();
//         carritosDao = new CarritosDaoFirebase();
//         break
//     case 'mongodb':
//         const { default: ProductosDaoMongoDb } = await import('./productos/productosDaoMongoDb.js')
//         const { default: CarritosDaoMongoDb } = await import('./carritos/carritosDaoMongoDb.js')

//         productosDao = new ProductosDaoMongoDb();
//          carritosDao = new CarritosDaoMongoDb();
//         break
//     default:
        
//         break
// }



export { productosDao, carritosDao }