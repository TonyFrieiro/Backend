const form = document.getElementById("registerForm")

const nav = document.getElementById("goLog")
form.addEventListener("submit",evt=>{
    evt.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value,key)=>obj[key]=value)
    fetch("/api/sessions/register",{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>{
        let stringified = JSON.stringify(json)

        fetch("/api/mails/register",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(json.status==="Succes"){
            window.location.replace("login")
        }
    })
})

nav.addEventListener("click",evt=>{
    window.location.replace("login")
})