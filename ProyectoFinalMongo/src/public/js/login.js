const form = document.getElementById("loginForm")

const nav = document.getElementById("goReg")

form.addEventListener("submit",evt=>{
    evt.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value,key)=>obj[key]=value)
    fetch("/api/sessions/login",{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>{
        if(json.status==="succes"){
            window.location.replace("productos")
        }else{window.location.reload()}
    })
})

nav.addEventListener("click",evt=>{
    window.location.replace("/")
})