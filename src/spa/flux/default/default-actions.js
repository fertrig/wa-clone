import {defaultActionTypes as defaultActionsTypes} from "./default-action-types";
import {mainViews} from "../../enums/main-views";
import {dispatcher} from '../dispatcher';
import {modalKeys} from "../../enums/modal-keys";

class DefaultActions {

    static GoToChatsView() {
        const action = {
            type: defaultActionsTypes.setMainView,
            data: {
                view: mainViews.chats
            }
        };
        dispatcher.dispatch(action);
    }

    static OpenAddContactModal() {
        const action = {
            type: defaultActionsTypes.setModalKey,
            data: {
                modalKey: modalKeys.addContact
            }
        };
        dispatcher.dispatch(action);
    }
}

export {DefaultActions}