import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

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
      document.code = stringAleatorio(10)
      const documentSaveModel = new this.coleccion(document)
      const saveOne_ = await documentSaveModel.save()
      return saveOne_._id.valueOf()
    }

    async actualizar(documentoActualizado, id) {
      await this.coleccion.updateOne({_id: id}, {$set: {...documentoActualizado}})
    }

    async borrar(id) {
      await this.coleccion.deleteOne({_id: id})
    }

    async borrarAll() {
      await this.coleccion.deleteMany({})
        }
    }


export default ContenedorMongoDb