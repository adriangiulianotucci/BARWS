const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path')
const database = require('./db/db')
const cors = require('cors')

//resources
const getRoom = require('./resources/resources')

//routes
app.use(express.static('public'));

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/client.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/admin.html'));
  });

app.get('/:id', (req, res) => {
    let id = parseInt(req.params.id)
    res.status(200).send(database.getFreeOrders(id))
})

app.post('/:orderId', (req, res) => {
    let orderId = parseInt(req.params.orderId)
    res.status(200).send(database.takeOrder(orderId))
})

//websocket

io.on('connection', (socket) => {
    console.log('client connected')
    socket.on('join', (msg) => {
        socket.join(msg)
        socket.emit('roomCreation', 'PREPARANDO')
    })
    socket.on('orderStatus', (msg) => {
        console.log(getRoom(socket))
        setTimeout(() => {
            io.to(getRoom(socket)).emit('orderStatus', msg)
        }, 2000);
    })
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});