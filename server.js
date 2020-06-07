const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path')
const database = require('./db/db')
const cors = require('cors')
const bodyParser = require('body-parser')

//resources
const getRoom = require('./resources/resources')

app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/client.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/admin.html'));
});

app.post('/finish' , (req, res) => {
    webSocket.finishOrder(req.body.idLocal,req.body.idOrder)
    //emite estado finalizado
    res.status(200).send('ORDEN FINALIZADA')
})

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
    socket.on('join', (msg) => {
        webSocket.createRoom(socket, msg)
    })
});

//webSocket object

const webSocket = {
    createRoom : function(socket , msg) {
            socket.join(msg)
            //emite stado de preparando
            socket.emit('roomCreation', 'PREPARANDO')
    },
    finishOrder: function(idLocal,idOrder) {
        io.to(`order${idOrder}&local${idLocal}`).emit('orderStatus', 'READY')
    }
}


http.listen(3000, () => {
    console.log('listening on *:3000');
});