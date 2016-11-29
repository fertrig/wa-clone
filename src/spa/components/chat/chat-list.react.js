import React from 'react';
import {DefaultActions} from '../../flux/default/default-actions';

function ChatList ({ chats }) {
    return (
        <div className="chat-list">
            {chats.map((chat) => {

                const onClick = () => {
                    DefaultActions.showChat(chat.handle);
                };

                return <div key={chat.handle} className="chat-item" onClick={onClick}>{chat.handle}</div>
            })}
        </div>
    );
}

export default ChatList;