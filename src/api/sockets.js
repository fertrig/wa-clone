import createSocketIoServer from 'socket.io';
import {SocketEvents} from '../core/socket-events';

let io = null;

function setupSockets(httpServer) {
    io = createSocketIoServer(httpServer);

    io.on('connection', function (socket) {
        socket.emit(SocketEvents.system(), 'server connected');

        socket.on(SocketEvents.system(), function (data) {
            console.log(data);
        });
    });
}

export {setupSockets, io}