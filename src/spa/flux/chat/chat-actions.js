import {chatActionTypes} from "./chat-action-types";
import {dispatcher} from '../dispatcher';

class ChatActions {

    static processFact(fact) {
        const action = {
            type: chatActionTypes.processFact,
            data: {
                fact
            }
        };

        dispatcher.dispatch(action);
    }
}

export {ChatActions}