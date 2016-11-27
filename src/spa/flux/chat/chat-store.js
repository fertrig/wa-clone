import {BaseStore} from '../base-store';
import {chatActionTypes} from './chat-action-types';

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
}

const chatStore = new ChatStore();

export {chatStore}