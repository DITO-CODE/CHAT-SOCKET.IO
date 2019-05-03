const express = require('express');
const path = require('path');
const app = express();

const SocketIO = require('socket.io');

//Settings
app.set('port',process.env.PORT || 3007);

//Archivos estaticos.
app.use(express.static(path.join(__dirname,'public')));

//Inicia el servidor
const server = app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
});

//Socket io necesita de un servidor creado
const io = SocketIO.listen(server);

//WebSockets
io.on('connection',(socket)=>{
    console.log('new Connection',socket.id);
    socket.on('chat:message',(data)=>{
       io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typing',data);
    });
});