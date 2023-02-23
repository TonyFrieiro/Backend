




setTimeout(function(){
    const carrou = document.getElementById("carrou")
    let botones = document.getElementsByClassName("botones")
    console.log("segundo script"+ JSON.stringify(botones))
    let carritoPorFin = document.getElementById("carritoIngreso")
    let carritoMejorado =[]
    for (let i = 0; i < botones.length; i++) {            
      botones[i].addEventListener('click',function(){
      carrito.push(botones[i].id)
      console.log(carrito)
      let busqueda = fetch("/api/productos/"+botones[i].id+"",{
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
      }).then(result=>result.json()).then(json=>carritoMejorado.push(json)).then(console.log(carritoMejorado)).then(
        carritoIngreso.innerHTML += `
          
          <p id="compraCarrito"> ${JSON.stringify( carritoMejorado[i])}</p>
  
  
          <form id="carritoIngreso">
          <label></label>
          <input name="productos" type="hidden" value=${JSON.stringify(carritoMejorado)}>
          
          </form>
  
  
  
        `
      )
      
  
      
      })
    }
}, 3000);