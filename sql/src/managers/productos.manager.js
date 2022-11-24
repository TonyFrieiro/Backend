import fs, { existsSync } from "fs";
import __dirname from "../utils.js";
import {uploader} from "../utils.js"
import knex from "knex"
import database from "../knex/knex.js"

const pathToFile = __dirname+"/files/productos.json"

class Manager{
    save = async(product) =>{
        if(!product.tittle || !product.price || !product.img || !product.description || !product.stock || !product.code ){
            return{
                status:"error",
                message:"missing required fields"
            }}
        else{
            product.code = product.tittle + 123
            let result = await database("products").insert(product)
            return{
                status:"Success",
                message:"User created successfully"
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
            let users = JSON.parse(data);
            let user = users.find((user) => user.id == idIngresado)
            if (user){
                return{
                    status:"Success",
                    message: user
                }
            }else{
                return{
                    status:"error",
                    message:"there is no object with that Id"
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
        }else{
        let result = await database("products").where("id",idIngresado).del()
        return{
            status:"succes",
            message:"Usuario fue eliminado"
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

    actualizar = async(idIngresado,campo,valor) =>{
        if(!idIngresado){
            return{
                status:"error",
                message:"Id is required"
            }
        }
        const update = {campo:valor}
        let result = await database("products").where("id",idIngresado).update(update)
        result.send({result})
    }

}

export { Manager}
