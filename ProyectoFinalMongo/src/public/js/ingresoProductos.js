const form = document.getElementById("productosIngreso")

const nav = document.getElementById("goProductos")

form.addEventListener("submit",evt=>{
    evt.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value,key)=>obj[key]=value)
    fetch("/api/productos",{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>{
        if(json.status==="Succes"){
            window.location.replace("productos")
        }
    })
})

nav.addEventListener("click",evt=>{
    window.location.replace("productos")
})
