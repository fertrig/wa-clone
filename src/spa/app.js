import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Increment from './increment.react';
import MainContainer from './components/main-container.react';
import io from 'socket.io-client';

require('./normalize.scss');

function setupSockets() {
    const socket = io.connect(global.__apiUrl__);
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
}


ReactDOM.render(<MainContainer />, document.getElementById('root'), setupSockets);