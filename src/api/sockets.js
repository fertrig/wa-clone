import createSocketIoServer from 'socket.io';
import {socketEvents} from '../core/socket-events';

let io = null;

function setupSockets(httpServer) {
    io = createSocketIoServer(httpServer);

    io.on('connection', function (socket) {
        socket.emit(socketEvents.system, 'server connected');

        socket.on(socketEvents.system, function (data) {
            console.log(data);
        });
    });
}

function emitUserFact(handle, fact) {
    const namespace = `/${handle}`;
    console.log(namespace, fact);

    const userSocket = io.of(namespace);
    userSocket.emit(socketEvents.fact, fact);
}

export {setupSockets, emitUserFact}