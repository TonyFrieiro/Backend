import dotenv from "dotenv"


dotenv.config()


export default {
    mongo:{
        USER : process.env.MONGO_USER, 
        PWD  : process.env.MONGO_PASSWORD,
        DB   : process.env.MONGO_DATABASE,
        URL  : process.env.MONGO_URL
    },
    jwt:{
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET
    }
}






// export default {
//     mongo:{
//         URL: process.env.MONGO_URL
//     },
//     jwt:{
//         COOKIE: process.env.JWT_COOKIE,
//         SECRET: process.env.JWT_SECRET
//     }
// }