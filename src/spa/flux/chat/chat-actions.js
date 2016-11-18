import {dispatcher} from '../dispatcher';
import {chatActionTypes} from './chat-action-types';

class ChatActions {
    static showAddContactModal() {
        dispatcher.dispatch({
            type: chatActionTypes.showAddContactModal
        });
    }
}

export {ChatActions}