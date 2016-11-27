import {BaseStore} from '../base-store';
import {chatActionTypes} from './chat-action-types';
import {defaultStore} from '../default/default-store';

class ChatStore extends BaseStore {

    constructor() {
        super('chat-store-change');
        const modifier = new StateModifier(this.state);
        this.setup(modifier, ActionHandler.handleAction);
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
    }

    processFact(fact) {
        if (fact.type === 'added-as-contact') {
            if (fact.data.sender === defaultStore.user.handle) {
                this._state.chats.push({
                    handle: fact.data.receiver
                });
            }
            else {
                this._state.chats.push({
                    handle: fact.data.sender
                });
            }
        }
    }
}

const chatStore = new ChatStore();

export {chatStore}