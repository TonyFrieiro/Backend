import ContenedorMongoDb from "../../contenedores/contenedorMongoDb.js"


class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            productos: { type: Array, required: true }
        })
    }

    // async guardar(carrito = { productos : []}) {
    //     return super.guardar(carrito)
    // }
}




export default CarritosDaoMongoDb