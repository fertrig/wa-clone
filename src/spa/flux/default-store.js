import {BaseStore} from './base-store';

class DefaultStore extends BaseStore {

    constructor() {
        super('default-store-change');
        const modifier = new StateModifier(this.state);
        this.setup(modifier, ActionHandler.handleAction);
    }
}

class ActionHandler {

    static handleAction(action, modifier, emitChange) {

        console.log('handling action', action);

        switch (action.type) {
            case 'set-active-view':
                modifier.setActiveView(action.data.view);
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
        this.resetState();
    }

    resetState() {
        this._state.activeView = 'setup-profile';
    }

    setActiveView(view) {
        this._state.activeView = view;
    }
}

const defaultStore = new DefaultStore();

export {defaultStore}