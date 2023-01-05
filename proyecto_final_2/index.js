import admin from "firebase-admin"


import firebaseConfig from "./claveProyectoFinal2.json" assert {type:"json"}




const firebaseCRUD = async() =>{
    admin.initializeApp({
        credential:admin.credential.cert(firebaseConfig)
    })

    const db = admin.firestore()
    const productos = db.collection("productos")

    //CREAR UN PRODUCTO:
    // let doc = productos.doc()
    // await doc.create({nombre:"teclado",precio:2000,descripcion:"el mejor teclado de todos",stock:3})

    //GET ALL:
    // let snapShot = await productos.get()
    // const docs = snapShot.docs
    // const result = docs.map(doc=>({
    //     id:doc.id,
    //     nombre:doc.data().nombre,
    //     precio:doc.data().precio,
    //     descripcion:doc.data().descripcion,
    //     stock:doc.data().stock
    // }))
    // console.log(result)

    //GET ONE (by id):
    // const id = "0p7z2E4u4XH7Hg7FgdAT"
    // const doc = productos.doc(id)
    // const item = await doc.get()
    // const producto = item.data()
    // console.log(producto)

    //UPDATE:
    // const id = "0p7z2E4u4XH7Hg7FgdAT"
    // const doc = productos.doc(id)
    // let result = await doc.update({nombre:"celular"})
    // console.log(result)

    //DELETE:
    // const id = "0p7z2E4u4XH7Hg7FgdAT"
    // const doc = productos.doc(id)
    // const item = await doc.delete()
    // console.log(item)

    
}

firebaseCRUD()