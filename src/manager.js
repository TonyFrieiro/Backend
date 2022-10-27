import fs from 'fs'

const pathToFile = "./productos.json"

class Manager{
    save = async(user) =>{
        if(!user.tittle || !user.price || !user.thumbnail){
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
}

export { Manager}

// module.exports = Manager