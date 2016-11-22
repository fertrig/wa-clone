import {BaseStore} from '../base-store';
import {defaultActionTypes} from './default-action-types';
import {mainViews} from './main-views';
import {LocalStorageKeys} from "../../utils/local-storage-keys";

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

            case defaultActionTypes.showModal:
                modifier.showModal(action.data.modal);
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
        this._state.mainView = this._getInitialMainView();
        this._state.modal = null;
    }

    _getInitialMainView() {
        const token = localStorage.getItem(LocalStorageKeys.authToken);
        const user = localStorage.getItem(LocalStorageKeys.user);

        if (token) {
            console.log('auth token found');
            console.log('user', user);

            return mainViews.chats;
        }
        else {
            console.log('auth token not found');
            return mainViews.setupProfile;
        }
    }

    setMainView(view) {
        this._state.mainView = view;
    }

    showModal(modal) {
        this._state.modal = modal;
    }
}

const defaultStore = new DefaultStore();

export {defaultStore}