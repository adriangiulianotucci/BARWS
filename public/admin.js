//DOM elements
const socket = io("localhost:3000");
const roomOk = document.getElementById('roomOk')
const roomId = document.getElementById('roomId')

//Session data


roomOk.addEventListener('click', function () {
/*     socket.emit('join',`ROOMNUMBER${roomId.value}`)
    socket.emit('orderStatus','READY') */

    //el admin tendria que hacer un post con idLocal y idOrder
    let data = {idLocal: 12, idOrder: roomId.value};
    fetch('http://localhost:3000/finish', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

})

function finishOrder(idLocal,idOrder) {
    fetch()
}



