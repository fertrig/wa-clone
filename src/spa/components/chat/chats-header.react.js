import React from 'react';
import {defaultStore} from '../../flux/default/default-store';

function ChatsHeader () {
    return (
        <div className="header">
            <div className="handle">
                <span>my handle: {defaultStore.user.handle}</span>
            </div>
            <div className="chat-menu-item">
                <span>Chats</span>
            </div>
        </div>
    )
}

export default ChatsHeader;