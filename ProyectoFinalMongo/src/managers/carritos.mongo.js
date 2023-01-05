import mongoose from "mongoose"

const URL = "mongodb://127.0.0.1:27017/proyecto"

const connection = mongoose.connect(URL,(error)=>{
    if(error) console.log("hubo un error:"+error);
    else console.log("conectado a monguito");
})

class Manager {
    save = async (producto) => {
        
    }
}

const CRUD = async()=>{

    //INSERT MANY
    // let insertResult = await productosModel.insertMany(productosInsertar)
    // console.log(insertResult)

    //INSERT ONE
    // const newProducto =  { nombre: "libro", descripcion: " Soy un libro ", foto: "urlLibro", precio: 1800, stock: 20}
    // let insertResult = await productosModel.create(newProducto)
    // console.log(insertResult)

    //FIND
    // let produtos = await productosModel.find()
    // console.log(produtos)

    //UPDATE
    // let result = await productosModel.updateOne({nombre:"libro"},{$set:{precio:400}})
    // console.log(result)

    //DELETE
    // let result = await productosModel.deleteOne(({nombre:"libro"}))
    // console.log(result)
}


CRUD()