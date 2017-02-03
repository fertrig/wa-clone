import {BaseStore} from '../base-store';
import {chatActionTypes} from './chat-action-types';
import {defaultStore} from '../default/default-store';
import {LocalCache} from '../../utils/local-cache';
import {LocalCacheKeys} from '../../utils/local-cache-keys';
import {SecureAjaxRequest} from '../../utils/ajax-request';
import {ApiUrls} from '../../utils/api-urls';

class ChatStore extends BaseStore {

    constructor() {
        super('chat-store-change');
        const modifier = new StateModifier(this.state);
        this.setup(modifier, ActionHandler.handleAction);
    }

    getMessages(handle) {
        return this.state.messageMap.get(handle);
    }

    iAmSender(handle) {
        return this._modifier._iAmSender(handle);
    }
}

class ActionHandler {

    static handleAction(action, modifier, emitChange) {

        switch (action.type) {

            case chatActionTypes.processFact:
                modifier.processFact(action.data.fact);
                modifier.postProcessFact(action.data.fact);
                modifier.saveFact(action.data.fact);
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
        this.replayFacts();
    }

    saveFact(fact) {
        const facts = this._getLocalFacts();

        facts.push(fact);

        LocalCache.setObject(LocalCacheKeys.facts(), facts);
    }

    _getLocalFacts() {
        return LocalCache.getObject(LocalCacheKeys.facts()) || [];
    }

    replayFacts() {
        const facts = this._getLocalFacts();

        console.log('facts', facts);

        for (let fact of facts) {
            this.processFact(fact);
        }
    }

    processFact(fact) {

        let handle = null;
        let messages = null;
        let message = null;

        switch (fact.type) {
            case 'added-as-contact':

                handle = this._getHandle(fact);

                this._state.chats.push({
                    handle
                });

                // this._state.messageMap.set(handle, [
                //     { sender: defaultStore.user.handle, content: "Hi, Sally"},
                //     { sender: handle, content: "Took you long enough!"}
                // ]);

                this._state.messageMap.set(handle, []);

                break;

            case 'message-sent':

                handle = this._getHandle(fact);

                messages = this._state.messageMap.get(handle);
                message = fact.data;
                message.receivedByServer = true;
                messages.push(message);

                break;

            case 'ack-sent':

                handle = fact.data.sender;

                messages = this._state.messageMap.get(handle);

                message = messages.find((msg) => msg.messageId === fact.data.messageId);

                if (message) {
                    message.acknowledged = true;
                }

                break;

            default:
                throw new Error(`unexpected fact type ${fact.type}`);
        }
    }

    postProcessFact(fact) {

        switch (fact.type) {
            case 'message-sent':
                if (!this._iAmSender(fact.data.sender)) {
                    this._submitAck(fact.data);
                }
                break;

            default:
                break;
        }
    }

    _submitAck(message) {
        const request = new SecureAjaxRequest();

        const data = {
            receiver: message.sender,
            messageId: message.messageId
        };

        request.post({
            url: ApiUrls.acknowledge(),
            data,
            success: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    _getHandle(fact) {
        if (this._iAmSender(fact.data.sender)) {
            console.log(`I'm the sender!`);
            return fact.data.receiver;
        }
        else {
            console.log(`I'm the receiver!`);
            return fact.data.sender;
        }
    }

    _iAmSender(handle) {
        return handle === defaultStore.user.handle;
    }
}

const chatStore = new ChatStore();

export {chatStore}