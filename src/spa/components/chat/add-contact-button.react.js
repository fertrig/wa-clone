import React from 'react';
import {ChatActions} from '../../flux/chat/chat-actions';

function AddContactButton () {
    return (
        <div
            className="add-contact-button"
            onClick={ChatActions.showAddContactModal}>
            <span>+</span>
        </div>
    )
}

export default AddContactButton;