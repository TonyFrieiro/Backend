export const contenido2 = fetch("/api/productos",{
    method:"GET",
    headers:{
        "Content-Type":"application/json"
    }
}).then(result=>result.json()).then(json=>{
  console.log(json)
  console.log(typeof(json))
  
})