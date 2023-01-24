import ContenedorArchivo from "../../contenedores/contenedorArchivo.js"


class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('productos.json')
    }
}

export default ProductosDaoArchivo