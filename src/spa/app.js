import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Increment from './increment.react';
import MainContainer from './components/main-container.react';

require('./normalize.scss');

ReactDOM.render(<MainContainer />, document.getElementById('root'));