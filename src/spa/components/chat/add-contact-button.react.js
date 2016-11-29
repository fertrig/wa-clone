import React from 'react';
import {DefaultActions} from '../../flux/default/default-actions';

function AddContactButton () {
    require('./add-contact-button.scss');
    return (
        <div
            className="add-contact-button"
            onClick={DefaultActions.openAddContactModal}>
            <span>+</span>
        </div>
    )
}

export default AddContactButton;