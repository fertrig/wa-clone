import React from 'react';
import {DefaultActions} from '../../flux/default/default-actions';
import './add-contact-button.scss';

function AddContactButton () {
    return (
        <div
            className="add-contact-button"
            onClick={DefaultActions.openAddContactModal}>
            <span>+</span>
        </div>
    )
}

export default AddContactButton;