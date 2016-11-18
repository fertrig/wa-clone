import {dispatcher} from '../dispatcher';
import {defaultActionTypes} from './default-action-types';

class DefaultActions {

    static changeMainView(mainView) {
        dispatcher.dispatch({
            type: defaultActionTypes.setMainView,
            data: {
                mainView
            }
        });
    }
}

export {DefaultActions}