import {BaseStore} from "../base-store";
import {mainViews} from "../../enums/main-views";
import {defaultActionTypes} from "./default-action-types";
import {LocalCache} from '../../utils/local-cache';
import {LocalCacheKeys} from '../../utils/local-cache-keys';
import {emitSystemEvent} from '../../utils/sockets';

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
                modifier.setMainView(action.data.view);
                emitChange();
                break;

            case defaultActionTypes.setModalKey:
                modifier.setModalKey(action.data.modalKey);
                emitChange();
                break;

            case defaultActionTypes.closeModal:
                modifier.closeModal();
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
        this._state.mainView = this._getInitialMainView();
        this._state.modalKey = null;
    }

    _getInitialMainView() {
        const token = LocalCache.getString(LocalCacheKeys.authToken());
        const user = LocalCache.getObject(LocalCacheKeys.user());

        if (token) {
            console.log('token exists');
            console.log('user', user);

            global.setTimeout(() => {
                emitSystemEvent(`user ${user.handle} connected`);
            }, 0);
            return mainViews.chats;
        }
        else {
            console.log('token not found');
            return mainViews.setupProfile;
        }
    }

    setMainView(view) {
        this._state.mainView = view;
    }

    setModalKey(key) {
        this._state.modalKey = key;
    }

    closeModal() {
        this._state.modalKey = null;
    }
}

const defaultStore = new DefaultStore();

export {defaultStore}