import React from 'react';

function Modal ({ isOpen, children }) {

    if (isOpen) {
        return (
            <div className="modal-overlay">
                <div className="modal">
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