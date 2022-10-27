import {Manager} from "./manager.js"

const manager = new Manager();

//hardcodeamos un usuario

let user = {
    tittle: "camara",
    price: "3100",
    thumbnail: "camara.png",
}

//llamar a la funcion create user

// manager.save(user).then((response)=>{
//     console.log(response)
// })

//llamar a la funcion getall para leer todoos

// manager.getAll().then((response)=>{
//     console.log(response)
// })

// Funcion para leer por ID

// manager.getById(5).then((response)=>{
//     console.log(response)
// })

// Funcion para eliminar por id

// manager.deleteById(2).then((response)=>{
//     console.log(response)
// })

//funcion para eliminar todos

// manager.deleteAll().then((response)=>{
//     console.log(response)
// })