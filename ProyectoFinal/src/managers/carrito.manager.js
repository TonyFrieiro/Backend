import { timeStamp } from "console";
import fs, { existsSync } from "fs";
import __dirname from "../utils.js";


const pathToFile = __dirname+"/files/carrito.json"

class Manager{
    constructor(){
        if(!existsSync(pathToFile)){
            this.listen()
        }
    }
    listen = async(req,res)=>{
        await fs.promises.writeFile(pathToFile,JSON.stringify([]))
    }

    deleteProductoById = async(idCarrito,idProd) =>{
        if(!idCarrito || !idProd ){
            return{
                status:"error",
                message:"se necesitan los 2 IDs, producto y carrito "
            }
        }
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile,"utf-8");
            let carritos = JSON.parse(data);

            let carrito = carritos.find((carrito) => carrito.id == idCarrito)

            let newProductos = carrito.productos.filter((prod) => prod.id != idProd)

            carrito.productos = newProductos

            await fs.promises.writeFile(
                pathToFile,
                JSON.stringify(carritos, null, 2)
            )
            return{
                status:"succes",
                message:"producto eliminado"
            }
        }else{
            return{
                status:"error",
                message:"el producto no existe"
            }
        }
    }


    saveProducto = async(idCarro,producto) =>{
        if(!producto.id || !producto.time || !producto.nombre || !producto.descripcion || !producto.codigo || !producto.foto || !producto.precio || !producto.stock ){
            return{
                status:"error",
                message:"missing required fields"
            }}
        try{
            if(fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile,"utf-8");
                let carritos = JSON.parse(data);

                let carrito = carritos.find((carrito) => carrito.id == idCarro)
                
                let id = carrito.productos.length + 1;
                producto.id = id;
                producto.time = Date.now()
                carrito.productos.push(producto)
                await fs.promises.writeFile(pathToFile,JSON.stringify(carritos, null, 2))
                return{
                    status:"Success",
                    message:"producto agregado"
                }
            }else{
                producto.id = 1
                await fs.promises.writeFile(
                    pathToFile,
                    JSON.stringify([carrito], null, 2)
                )
                return{
                    status:"Succes",
                    message:"Producto agregado"
                }
            }
        }catch(error){
            return{
                status:"Error",
                message: error.message
            }
        }
            

    }
    save = async(carrito) =>{
        if(!carrito.id || !carrito.time ){
            return{
                status:"error",
                message:"missing required fields"
            }}

        try{
            if(fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile,"utf-8");
                let carritos = JSON.parse(data);
                let id = carritos.length + 1;
                carrito.id = id;
                carrito.time = Date.now()
                carrito.productos = []
                carritos.push(carrito);
                await fs.promises.writeFile(pathToFile,JSON.stringify(carritos, null, 2))
                return{
                    status:"Success",
                    message:"User created successfully"
                }
            }else{
                carrito.id = 1
                await fs.promises.writeFile(
                    pathToFile,
                    JSON.stringify([carrito], null, 2)
                )
                return{
                    status:"Succes",
                    message:"User created"
                }
            }
        }catch(error){
            return{
                status:"Error",
                message: error.message
            }
        }
        
    }

    //Crear funcion para leer todos los usuarios

    getAll = async()=>{
        try{
            if(fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile,"utf-8");
                let productos = JSON.parse(data);
                return{
                    status:"success",
                    productos:productos
                }
            }else{
                return{
                    status:"error",
                    message:"no users found"
                }
            }
        }catch(error){
            return{
                status:"error",
                message:error.message
            }
        }
    }

    // funcion para leer un usuario por su ID

    getById = async(idIngresado) =>{
        if(!idIngresado){
            return{
                status:"error",
                message:"Id is required"
            }
        }
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile,"utf-8");
            let carritos = JSON.parse(data);
            let carrito = carritos.find((carrito) => carrito.id == idIngresado)
            if (carrito){
                return{
                    status:"Success",
                    message: carrito
                }
            }else{
                return{
                    status:"error",
                    message:"there is no carrito with that Id"
                }
            }
        }

    } 

    //Funcion para eliminar un usuario por Id

    deleteById = async(idIngresado) =>{
        if(!idIngresado){
            return{
                status:"error",
                message:"Id is required"
            }
        }
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile,"utf-8");
            let carritos = JSON.parse(data);
            let newCarritos= carritos.filter((carrito) => carrito.id != idIngresado)
            await fs.promises.writeFile(
                pathToFile,
                JSON.stringify(newCarritos, null, 2)
            )
            return{
                status:"succes",
                message:"carrito eliminado"
            }
        }else{
            return{
                status:"error",
                message:"el carrito no existe"
            }
        }
    }

    deleteAll = async() =>{
        try {
            if (fs.existsSync(pathToFile)) {
                let newProd = [];
                await fs.promises.writeFile(pathToFile, JSON.stringify(newProd))
                return{
                    status:"success",
                    message:"se eliminaron todos los objetos"
                }
            } else {
                return {
                    status: "Error",
                    Message: "No file found"
                }
            }
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }

    actualizar = async(idIngresado,user) =>{
        if(!idIngresado){
            return{
                status:"error",
                message:"Id is required"
            }
        }
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile,"utf-8");
            let users = JSON.parse(data);
            let newUsers = users.filter((user) => user.id != idIngresado)
            await fs.promises.writeFile(
                pathToFile,
                JSON.stringify(newUsers, null, 2)
            )
            user.id = parseInt(idIngresado);
                users.push(user);
                await fs.promises.writeFile(pathToFile,JSON.stringify(users, null, 2))
                return{
                    status:"Success",
                    message:"User actualizado successfully"
                }

        }
    }

}

export { Manager}
