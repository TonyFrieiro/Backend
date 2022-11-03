

const form = document.getElementById("productosForm")
const button = document.getElementById("navForm")


form.addEventListener("submit",e=>{
    e.preventDefault()
    let data = new FormData(form)
    let obj = {}
    data.forEach((value,key)=>obj[key]=value)
    fetch("/api/productos",{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>console.log(json))
})

button.addEventListener("click",()=>{
    console.log("tocaste")
    location.href='/productos'
    
    
})