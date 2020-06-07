const socket = io("localhost:3000");

const client = {
    //DOM elements
    roomOk : document.getElementById('roomOk'),
    roomId : document.getElementById('roomId'),
    stateArea : document.getElementById('state'),

    changeOrderState : function(value) {
        this.stateArea.value = value
    }
}


//Session data
let session = {}

//HTTP request que trae un id de pedido free, registro esa data en la session y guardo en localstorage






//Inicio una conexion de WS para escuchar el estado de ese pedido
client.roomOk.addEventListener('click', async function () {

let order = {}
//OBTIENE LA ORDER FREE
fetch(`http://localhost:3000/${client.roomId.value}`)
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
      socket.emit('join',`order${order.id}&local${order.local}`)
      socket.on('roomCreation', (msg) => {
          if(msg === 'PREPARANDO') {
              client.changeOrderState('FUNCION QUE ESTILA EL PREPARANDO')
          }
        })
      socket.on('orderStatus', (msg) => {
          if(msg === 'READY') {
              client.changeOrderState('FUNCION QUE ESTILA EL READY')
          }
        })
  })

})

//Funciones que alteran el estado