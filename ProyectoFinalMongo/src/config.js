import mongoose from "mongoose"
import * as dotenv from 'dotenv' 
dotenv.config()

export default {
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@codercluster.kxaklqz.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    }

}