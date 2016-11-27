import React from 'react';

function ChatList ({ chats }) {
    return (
        <div className="chat-list">
            {chats.map((chat, index) => {
                return <div key={index}>{chat.handle}</div>
            })}
        </div>
    );
}

export default ChatList;