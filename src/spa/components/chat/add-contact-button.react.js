import React from 'react';
import {DefaultActions} from '../../flux/default/default-actions';

function AddContactButton () {
    return (
        <div
            className="add-contact-button"
            onClick={DefaultActions.OpenAddContactModal}>
            <span>+</span>
        </div>
    )
}

export default AddContactButton;