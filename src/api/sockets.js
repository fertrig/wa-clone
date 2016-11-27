import createSocketIoServer from 'socket.io';

let io = null;

function setupSockets(httpServer) {
    io = createSocketIoServer(httpServer);

    io.on('connection', function (socket) {
        socket.emit('news', {hello: 'world'});
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}

export {setupSockets, io}