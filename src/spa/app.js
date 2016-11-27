import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Increment from './increment.react';
import MainContainer from './components/main-container.react';
import {setupSockets} from './utils/sockets';

require('./normalize.scss');

setupSockets();

ReactDOM.render(<MainContainer />, document.getElementById('root'));