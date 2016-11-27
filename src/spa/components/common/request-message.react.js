import React from 'react';
import {requestStates} from '../../enums/request-states';

function RequestMessage ({requestState}) {
    let message;

    switch (requestState) {
        case requestStates.default:
        case requestStates.fetching:
            break;

        case requestStates.success:
            message = 'Request successful.';
            break;

        case requestStates.hasError:
            message = 'There was an error. Please try again.';
            break;

        default:
            throw new Error(`unexpected request state ${this.state.requestState}`);
    }

    return (
        <div className="request-message"><span>{message}</span></div>
    );
}

export default RequestMessage;