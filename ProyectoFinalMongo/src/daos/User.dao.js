import mongoose from "mongoose"

const collection = "Users"

const schema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:String,
        default:"user"
    }
})

const userModel = mongoose.model(collection,schema)

export default userModel