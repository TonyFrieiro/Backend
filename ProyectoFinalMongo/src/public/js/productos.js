const carritoIngreso = document.getElementById("carritoIngreso")

const nav = document.getElementById("navLista")

carritoIngreso.addEventListener("submit",evt=>{
    evt.preventDefault()
    const userSession = async() => {await fetch("/api/sessions/user").then(result=>result.json())}
    const data = new FormData(carritoIngreso)
    const obj = {}
    data.forEach((value,key)=>obj[key]=value)
    obj.user = userSession.value
    fetch("/api/carritos",{
        method:"POST",
        body:(JSON.stringify(obj)),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>{
        fetch("/api/mails/compra",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        // if(json.status==="Succes"){
        //     window.location.replace("productos")
        // }
    }).then(alert("compra realizada!")).then(location.reload())
    // .then(location.reload())
})

nav.addEventListener("click",evt=>{
    window.location.replace("ingresoProductos")
})

const buttonDesloguearse = document.getElementById("buttonDesloguearse")

buttonDesloguearse.addEventListener("click",evt=>{
    window.location.replace("logout")
})






// const boton = document.getElementById("ingreso")

// boton.addEventListener("click",evt=>{

// })









// export const getData = () => 
//     fetch("/api/productos",{
//         method:"GET",
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(result=>result.json()).then(json=>{
//         console.log(json)
//         // const contenido = json
//     })





