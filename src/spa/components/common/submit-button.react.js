import React from 'react';

function SubmitButton ({ text, enabled, onSubmit }) {
    require('./submit-button.scss');
    if (enabled) {
        return <div className="submit-button" onClick={onSubmit}>{text}</div>
    }
    else {
        return <div className="submit-button" onClick={onSubmit} disabled>{text}</div>
    }
}

export default SubmitButton;