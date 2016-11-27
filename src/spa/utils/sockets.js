import io from 'socket.io-client';
import {SocketEvents} from '../../core/socket-events';

let socket;

function setupSockets() {

    socket = io.connect(global.__apiUrl__);

    socket.emit(SocketEvents.system(), `some client connected`);

    socket.on(SocketEvents.system(), function (data) {
        console.log(data);
    });
}

function emitSystemEvent(message) {
    socket.emit(SocketEvents.system(), message);
}

export {setupSockets, emitSystemEvent}