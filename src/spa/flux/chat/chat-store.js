import {BaseStore} from '../base-store';
import {chatActionTypes} from './chat-action-types';
import {defaultStore} from '../default/default-store';

class ChatStore extends BaseStore {

    constructor() {
        super('chat-store-change');
        const modifier = new StateModifier(this.state);
        this.setup(modifier, ActionHandler.handleAction);
    }

    getMessages(handle) {
        return this.state.messageMap.get(handle);
    }
}

class ActionHandler {

    static handleAction(action, modifier, emitChange) {

        switch (action.type) {

            case chatActionTypes.processFact:
                modifier.processFact(action.data.fact);
                emitChange();
                break;

            default:
                break;
        }
    }
}

class StateModifier {
    constructor(state) {
        this._state = state;
        this.initializeState();
    }

    initializeState() {
        this._state.chats = [];
        this._state.messageMap = new Map();
    }

    processFact(fact) {

        let handle = null;

        switch (fact.type) {
            case 'added-as-contact':

                handle = this._getHandle(fact);

                this._state.chats.push({
                    handle
                });

                this._state.messageMap.set(handle, [ "some dummy message "]);

                break;

            case 'message-sent':

                handle = this._getHandle(fact);

                const messages = this._state.messageMap.get(handle);
                messages.push(fact.data.content);

                break;

            default:
                throw new Error(`unexpected fact type ${fact.type}`);
        }
    }

    _getHandle(fact) {
        if (fact.data.sender === defaultStore.user.handle) {
            console.log(`I'm the sender!`);
            return fact.data.receiver;
        }
        else {
            console.log(`I'm the receiver!`);
            return fact.data.sender;
        }
    }
}

const chatStore = new ChatStore();

export {chatStore}