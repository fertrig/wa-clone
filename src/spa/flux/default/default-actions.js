import {defaultActionTypes as defaultActionsTypes} from "./default-action-types";
import {mainViews} from "../../enums/main-views";
import {dispatcher} from '../dispatcher';
import {modalKeys} from "../../enums/modal-keys";

class DefaultActions {

    static goToChatsView() {
        const action = {
            type: defaultActionsTypes.setMainView,
            data: {
                view: mainViews.chats
            }
        };
        dispatcher.dispatch(action);
    }

    static openAddContactModal() {
        const action = {
            type: defaultActionsTypes.setModalKey,
            data: {
                modalKey: modalKeys.addContact
            }
        };
        dispatcher.dispatch(action);
    }

    static closeModal() {
        const action = {
            type: defaultActionsTypes.closeModal
        };
        dispatcher.dispatch(action);
    }
}

export {DefaultActions}