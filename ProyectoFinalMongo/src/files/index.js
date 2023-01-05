const socket = io()
console.log(socket)


const form = document.getElementById("productosForm")
const button = document.getElementById("navForm")

function clearInputs() {
    document.getElementById("productosForm").reset();
}

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
    clearInputs()
})

button.addEventListener("click",()=>{
    console.log("tocaste")
    location.href='/productos'
    
    
})

socket.emit("message",data=>{
    console.log("douuu")
    const logs = document.getElementById("productos")
    logs.innerHTML = data
})



socket.on("productos",function(data){
    console.log(data)


    porductosMostrar = data.map(function (elem, index) {
        return `<div>
                   <strong>${elem.tittle}</strong>:
                   <em>      $ ${elem.price}</em>
                   <img src="${elem.thumbnail}" alt="productoImg">
                   <style>
                   img { 
                    height: 50px;
                    width: 50px;;
                      }
                    div{
                        text-align: center;
                        margin-top:10px;
                    }
                    </style>
          </div>`;
      })

    const logs = document.getElementById("productos")
    logs.innerHTML = porductosMostrar
})

///CHAT

let input = document.getElementById("input")
input.addEventListener("keyup",evt=>{
    if(evt.key === "Enter"){
        let inputNombre = document.getElementById("nombre")
        mensaje = [input.value,inputNombre.value]
        socket.emit("chat",mensaje)
        console.log(input.value)
        inputNombre.value = ""
        input.value = ""
    }
    
})



socket.on("messageLog",function(data){
    console.log(data)

    let messages = "";
    data.forEach(log => {
        messages +=  `${log.socketId}  dice:  ${log.message}  <br/>`
    });
    const mens = document.getElementById("mensajes")
    mens.innerHTML = messages

    socket.emit("message",console.log)
})
