import {Dispatcher} from 'flux';

const dispatcher = new Dispatcher();
const dispatch = dispatcher.dispatch;

export {dispatcher, dispatch};