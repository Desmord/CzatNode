const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../client/')));

server.listen(8000, () => {

    try {
        console.log("Server czatu uruchomiony na porcie 8080.");
    } catch (err) {
        console.log("Błąd podczas uruchamiania serwera czatu.");
    }

});



const userEvents = require(`./userEvents`);

io.on(`connection`,(socket)=>{
    io.sockets.setMaxListeners(201);

    userEvents.userEventsObject.logInEvent(socket);
    userEvents.userEventsObject.chatUserDisconection(socket);
    userEvents.userEventsObject.chatUserConnection(socket);
    userEvents.userEventsObject.chatUserMessage(socket);

});
