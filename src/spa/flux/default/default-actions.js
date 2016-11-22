import {dispatcher} from '../dispatcher';
import {defaultActionTypes} from './default-action-types';
import {modals} from './modals';

class DefaultActions {

    static changeMainView(mainView) {
        dispatcher.dispatch({
            type: defaultActionTypes.setMainView,
            data: {
                mainView
            }
        });
    }

    static showAddContactModal() {
        dispatcher.dispatch({
            type: defaultActionTypes.showModal,
            data: {
                modal: modals.addContact
            }
        });
    }
}

export {DefaultActions}