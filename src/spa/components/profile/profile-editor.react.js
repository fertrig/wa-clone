import React from 'react';
import './profile-editor.scss';

function ProfileEditor ({ handle, name, onHandleChange, onNameChange }) {
    return (
        <div className="profile-editor">
            <label>Handle</label>
            <input type="text" onChange={onHandleChange} value={handle}/>
            <label>Name</label>
            <input type="text" onChange={onNameChange} value={name}/>
        </div>
    );
}

export default ProfileEditor;