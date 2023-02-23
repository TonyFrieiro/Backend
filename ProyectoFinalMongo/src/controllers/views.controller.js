


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
    if (req.session.value = undefined) {
        res.render("login")
    }else{
    let userName = JSON.stringify(req.session.user.name)
    let userRole = JSON.stringify(req.session.user.role)
    res.render("productos",{userName,userRole})}
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