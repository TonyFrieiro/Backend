import mongoose from "mongoose";

const collection = "mensajes"

const schema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    mensaje:{
        type:String,
        required:true
    },
    foto:{
        type:String,
        required:false
    }

})

const mensajesModel = mongoose.model(collection,schema)

export default mensajesModel