import io from 'socket.io-client';
import {socketEvents} from '../../core/socket-events';
import {ChatActions} from "../flux/chat/chat-actions";

let defaultSocket;
let userSocket;

function setupSockets() {

    defaultSocket = io.connect(global.__apiUrl__);

    defaultSocket.emit(socketEvents.system, `some client connected`);

    defaultSocket.on(socketEvents.system, function (data) {
        console.log(data);
    });
}

function connectToUserSocket(handle) {
    const namespace = `/${handle}`;
    const url = `${global.__apiUrl__}${namespace}`;
    userSocket = io.connect(url);
    defaultSocket.emit(socketEvents.system, `client connected on ${namespace}`);

    userSocket.on(socketEvents.fact, function(data) {
        console.log('fact received!', data);

        ChatActions.processFact(data);
    });
}

export {setupSockets, connectToUserSocket}