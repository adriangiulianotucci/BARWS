//DOM elements
const socket = io("localhost:3000");
const roomOk = document.getElementById('roomOk')
const roomId = document.getElementById('roomId')

//Session data


roomOk.addEventListener('click', function () {
    socket.emit('join',`ROOMNUMBER${roomId.value}`)
    socket.emit('orderStatus','READY')
})




