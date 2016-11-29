import React from 'react';

function ChatList ({ chats }) {
    return (
        <div className="chat-list">
            {chats.map((chat) => {
                return <div key={chat.handle} className="chat-item">{chat.handle}</div>
            })}
        </div>
    );
}

export default ChatList;