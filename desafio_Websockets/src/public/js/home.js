
const socket = io()
console.log(socket)

const textBox = document.getElementById("textBox")

textBox.addEventListener("keyup",evt=>{
    if(evt.key === "Enter"){
        socket.emit("message",textBox.value)
    }
    
})

//Socket LISTENER



socket.on("message",data=>{
    console.log("contectadisimo")

    let messages = "";
    data.forEach(log => {
        messages +=  `${log.socketId}  dice:  ${log.message}  <br/>`
    });
    const prod = document.getElementById("productos")
    prod.innerHTML = data
    socket.emit("message",console.log)
})