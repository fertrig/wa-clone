import React from 'react';
import SubmitButton from './submit-button.react';
import {requestStates} from '../../enums/request-states';

function RequestSubmitButton ({requestState, onSubmit}) {

    let isSubmitButtonEnabled;

    switch (requestState) {
        case requestStates.default:
        case requestStates.hasError:
            isSubmitButtonEnabled = true;
            break;

        case requestStates.fetching:
        case requestStates.success:
            isSubmitButtonEnabled = false;
            break;

        default:
            throw new Error(`unexpected request state ${this.state.requestState}`);
    }

    return (
        <SubmitButton
            text={requestState === requestStates.fetching ? 'Submitting...' : 'Submit' }
            enabled={isSubmitButtonEnabled}
            onSubmit={onSubmit}/>
    );
}

export default RequestSubmitButton;