// const { promises: fs } = require('fs')
import fs from "fs"
import config from '../config.js'

const pathToFile2 = "./json/carritos.json"
const pathToFile = "./json/DB.json"

class ContenedorArchivo {

    constructor(ruta) {
        this.path = pathToFile
    }

    async listar(idIngresado) {

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

    async listarAll() {
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

    async guardar(user) {
        if(!user.title || !user.price || !user.thumbnail){
            return{
                status:"error",
                message:"missing required fields"
            }}

        try{
            if(fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile,"utf-8");
                let users = JSON.parse(data);
                let id = users.length + 1;
                user.id = id;
                users.push(user);
                await fs.promises.writeFile(pathToFile,JSON.stringify(users, null, 2))
                return{
                    status:"Success",
                    message:"User created successfully"
                }
            }else{
                user.id = 1
                await fs.promises.writeFile(
                    pathToFile,
                    JSON.stringify([user], null, 2)
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

    async actualizar(user, idIngresado) {
        // const objs = await this.listarAll()
        // const index = objs.findIndex(o => o.id == id)
        // if (index == -1) {
        //     throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        // } else {
        //     objs[index] = { ...elem, id }
        //     try {
        //         await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        //     } catch (error) {
        //         throw new Error(`Error al borrar: ${error}`)
        //     }
        // }

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

    async borrar(idIngresado) {
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
            return{
                status:"succes",
                message:"Usuario fue eliminado"
            }
        }else{
            return{
                status:"error",
                message:"el usuario no existe"
            }
        }
    }

    async borrarAll() {
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

    async guardarCarrito(user){
        if(!user.productos){
            return{
                status:"error",
                message:"missing required fields"
            }}

        try{
            if(fs.existsSync(pathToFile2)){
                let data = await fs.promises.readFile(pathToFile2,"utf-8");
                let users = JSON.parse(data);
                let id = users.length + 1;
                user.id = id;
                users.push(user);
                await fs.promises.writeFile(pathToFile2,JSON.stringify(users, null, 2))
                return{
                    status:"Success",
                    message:"User created successfully"
                }
            }else{
                user.id = 1
                await fs.promises.writeFile(
                    pathToFile2,
                    JSON.stringify([user], null, 2)
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

    async listarCarrito(idIngresado) {

        if(!idIngresado){
            return{
                status:"error",
                message:"Id is required"
            }
        }
        if(fs.existsSync(pathToFile2)){
            let data = await fs.promises.readFile(pathToFile2,"utf-8");
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

    async listarAllCarritos() {
        try{
            if(fs.existsSync(pathToFile2)){
                let data = await fs.promises.readFile(pathToFile2,"utf-8");
                let carritos = JSON.parse(data);
                return{
                    status:"success",
                    carritos:carritos
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

    async actualizarCarrito(user, idIngresado) {

        if(!idIngresado){
            return{
                status:"error",
                message:"Id is required"
            }
        }
        if(fs.existsSync(pathToFile2)){
            let data = await fs.promises.readFile(pathToFile2,"utf-8");
            let users = JSON.parse(data);
            let newUsers = users.filter((user) => user.id != idIngresado)
            await fs.promises.writeFile(
                pathToFile2,
                JSON.stringify(newUsers, null, 2)
            )
            users.productos.push(user);
            await fs.promises.writeFile(pathToFile2,JSON.stringify(users, null, 2))
            return{
                status:"Success",
                message:"User actualizado successfully"
            }
        }
    }

    async borrarCarrito(idIngresado) {
        if(!idIngresado){
            return{
                status:"error",
                message:"Id is required"
            }
        }
        if(fs.existsSync(pathToFile2)){
            let data = await fs.promises.readFile(pathToFile2,"utf-8");
            let users = JSON.parse(data);
            let newUsers = users.filter((user) => user.id != idIngresado)
            await fs.promises.writeFile(
                pathToFile2,
                JSON.stringify(newUsers, null, 2)
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

    async borrarAllCarritos() {
        try {
            if (fs.existsSync(pathToFile2)) {
                let newProd = [];
                await fs.promises.writeFile(pathToFile2, JSON.stringify(newProd))
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
}

export default ContenedorArchivo