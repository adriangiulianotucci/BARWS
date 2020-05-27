//DOM elements
const socket = io("localhost:3000");
const roomOk = document.getElementById('roomOk')
const roomId = document.getElementById('roomId')
const stateArea = document.getElementById('state')

//Session data
let session = {}

//HTTP request que trae un id de pedido free, registro esa data en la session y guardo en localstorage






//Inicio una conexion de WS para escuchar el estado de ese pedido
roomOk.addEventListener('click', async function () {

let order = {}
//OBTIENE LA ORDER FREE
fetch(`http://localhost:3000/${roomId.value}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    order = myJson
    console.log(order)
    return myJson
  })
  .then(function(myJson) {
            //LA RESERVA
            //fetch(`http://localhost:3000/${order.id}`, {method : 'POST'})

  })
  .then(function(){
      //ESCUCHA LA ORDER
      socket.emit('join',`ROOMNUMBER${order.id}`)
      socket.on('roomCreation', (msg) => {
          stateArea.value=msg
      })
      socket.on('orderStatus', (msg) => {
        stateArea.value=msg
      })
  })

})

//Funciones que alteran el estado

