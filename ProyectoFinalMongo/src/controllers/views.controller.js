// import { getData } from "../public/js/productos.js"
import { contenido } from "../app.js"

// let contenido = [
//     {tittle:"botella",price:2003,thumbnail:"botella.png"},
//     {tittle:"camara",price:400,thumbnail:"camara.png"},
//     {tittle:"celular",price:2003,thumbnail:"celular.png"}
// ]


const register =  (req,res) =>{
    res.render("register")
}


const login = (req,res) =>{
    res.render("login")
}

const logout = (req,res) =>{
    res.render("logout")
}

const productos =  async  (req,res) =>{
    // const data = await getData()
    // res.render("productos",{data})
    if (req.session.value = undefined) {
        // redirect it to login page
        res.render("login")
    }else{
    res.render("productos",{contenido})}
}

const ingresoProductos = async (req,res)=>{
    res.render("ingresoProductos")
}

export default{
    register,
    login,
    logout,
    productos,
    ingresoProductos
}