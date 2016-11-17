import {dispatcher} from './dispatcher';

class DefaultActions {

    static changeView() {
        dispatcher.dispatch({
            type: 'set-active-view',
            data: {
                view: 'something-else'
            }
        });
    }
}

export {DefaultActions}