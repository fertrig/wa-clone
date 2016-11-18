import {BaseStore} from '../base-store';
import {defaultActionTypes} from './default-action-types';
import {mainViews} from './main-views';

class DefaultStore extends BaseStore {

    constructor() {
        super('default-store-change');
        const modifier = new StateModifier(this.state);
        this.setup(modifier, ActionHandler.handleAction);
    }
}

class ActionHandler {

    static handleAction(action, modifier, emitChange) {

        switch (action.type) {
            case defaultActionTypes.setMainView:
                modifier.setMainView(action.data.mainView);
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
        this._state.mainView = mainViews.setupProfile;
    }

    setMainView(view) {
        this._state.mainView = view;
    }
}

const defaultStore = new DefaultStore();

export {defaultStore}