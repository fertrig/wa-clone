import keyMirror from 'key-mirror';

const defaultActionTypes = keyMirror({
    processProfile: null,
    setMainView: null,
    setModalKey: null,
    closeModal: null
});

export {defaultActionTypes}