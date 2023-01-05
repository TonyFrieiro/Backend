import mongoose from "mongoose";

const collection = "carritos"

const schema = new mongoose.Schema({
    productos:{
        type:Array,
        required:true
    },
    time:{
        type:String,
        required:true
    },

})

const carritosModel = mongoose.model(collection,schema)

export default carritosModel