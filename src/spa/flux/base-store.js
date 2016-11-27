import {EventEmitter} from 'events';
import {dispatcher} from './dispatcher.js';

class BaseStore extends EventEmitter {

    constructor(changeEvent) {
        super();

        this._changeEvent = changeEvent;
        this._state = {};
    }

    setup(modifier, handleAction) {
        Object.seal(this._state);

        for (let key of Object.keys(this._state)) {
            Object.defineProperty(this, key, {
                get() {
                    return this._state[key];
                }
            });
        }

        this._modifier = modifier;
        this._handleAction = handleAction;

        this._dispatchToken = dispatcher.register(this._handleActionHelper.bind(this));
    }

    get state() {
        return this._state;
    }

    get dispatchToken() {
        return this._dispatchToken;
    }

    addChangeListener(callback) {
        this.on(this._changeEvent, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(this._changeEvent, callback);
    }

    _emitChange() {
        this.emit(this._changeEvent);
    }

    _handleActionHelper(action) {
        if (!action.type) {
            throw new Error('action payload is missing a type');
        }
        console.log('handling action', action);
        this._handleAction(action, this._modifier, this._emitChange.bind(this), this);
    }
}

export {
    BaseStore
}