import keyMirror from 'key-mirror';

const requestStates = keyMirror({
    default: null,
    fetching: null,
    success: null,
    hasError: null
});

export {requestStates}