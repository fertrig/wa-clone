import io from 'socket.io-client';
import {socketEvents} from '../../core/socket-events';
import {SocketUtils} from '../../core/socket-utils';
import {ChatActions} from "../flux/chat/chat-actions";
import urlJoin from 'url-join';
import {LocalCache} from './local-cache';
import {LocalCacheKeys} from './local-cache-keys';

let userSocket;

function connectToUserSocket(handle) {
    const namespace = SocketUtils.getUserNamespace(handle);
    const namespaceUrl = urlJoin(global.__apiUrl__, namespace);

    const authToken = LocalCache.getString(LocalCacheKeys.authToken());

    userSocket = io.connect(namespaceUrl, {
        query: `token=${authToken}`
    });

    console.log(`connected to namespace ${namespace}`);

    userSocket.on(socketEvents.fact, function(data) {
        console.log('fact received!', data);
        ChatActions.processFact(data);
    });
}

export {connectToUserSocket}