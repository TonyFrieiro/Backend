import  express  from "express";
import {addLogger} from "./utils/logger.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import productosRouter from "./routes/productos.router.js"
import carritosRouter from "./routes/carritos.router.js"
import mailsRouter from "./routes/mails.router.js"
import config from "./config/config.js"
import mongoose from "mongoose";
import cookieParser from "cookie-parser"

import * as dotenv from 'dotenv' 
dotenv.config()


/////passport
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
////passport

const app = express();
app.use(addLogger)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

/////////////////////PASSPORT

app.use(session({
    store:MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@codercluster.kxaklqz.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
        ttl:1000
    }),
    secret:"ajsdj4rt54t",
    saveUninitialized:false,
    resave:false,
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


/// poniendo handlebars como manejador de vistas

app.engine("handlebars",handlebars.engine())
app.set(`views`,`${__dirname}/views`)
app.set("view engine","handlebars")

app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.use(cookieParser())

app.use("/",viewsRouter)
app.use("/api/sessions",sessionsRouter)
app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)
app.use("/api/mails" , mailsRouter)




const connection = mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@codercluster.kxaklqz.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`)





//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))








