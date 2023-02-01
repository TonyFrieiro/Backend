import mongoose from 'mongoose'
import config from '../config.js'


await mongoose.connect(config.mongodb.cnxStr)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
      return await this.coleccion.findOne({_id: id})
    }

    async listarAll() {
      return await this.coleccion.find({})
    }

    async guardar(document) {
      document.timestamp = Date.now()
      // document.code = stringAleatorio(10)
      const documentSaveModel = new this.coleccion(document)
      const saveOne_ = await documentSaveModel.save()
      return saveOne_._id.valueOf()
    }

    // async guardarCarrito(document) {
    //   document.timestamp = Date.now()

    // }

    async actualizar(documentoActualizado, id) {
      await this.coleccion.updateOne({_id: id}, {$set: {...documentoActualizado}})
    }

    async borrar(id) {
      await this.coleccion.deleteOne({_id: id})
    }

    async borrarAll() {
      await this.coleccion.deleteMany({})
    }

    async guardarCarrito(document) {
      document.timestamp = Date.now()
      // document.user = req.session.user
      // document.code = stringAleatorio(10)
      const documentSaveModel = new this.coleccion(document)
      const saveOne_ = await documentSaveModel.save()
      return saveOne_._id.valueOf()
    }

    async listarCarrito(id) {
      return await this.coleccion.findOne({_id: id})
    }

    async listarAllCarritos() {
      return await this.coleccion.find({})
    }

    async actualizarCarrito(documentoActualizado, id) {
      await this.coleccion.updateOne({_id: id}, {$set: {...documentoActualizado}})
    }

    async borrarCarrito(id) {
      await this.coleccion.deleteOne({_id: id})
    }

    async borrarAllCarritos() {
      await this.coleccion.deleteMany({})
    }
  }

export default ContenedorMongoDb