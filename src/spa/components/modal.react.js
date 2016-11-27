import React from 'react';
import {DefaultActions} from '../flux/default/default-actions';

function Modal ({ isOpen, children }) {

    if (isOpen) {
        return (
            <div className="modal-overlay" onClick={DefaultActions.closeModal}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    }
    else {
        return null;
    }
}

export default Modal;