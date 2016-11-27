import React from 'react';
import {chatStore} from '../../flux/chat/chat-store';
import ChatsHeader from './chats-header.react';
import AddContactButton from './add-contact-button.react';
import ChatList from './chat-list.react';

class Chats extends React.Component {
    constructor(props) {
        super();
        this.state = {
            chats: chatStore.chats
        };
    }

    render() {

        require('./chats.scss');

        return (
            <div className="chats">
                <ChatsHeader />
                {this._renderContents()}
            </div>
        )
    }

    _renderContents() {
        if (this.state.chats.length > 0) {
            return <ChatList />;
        }
        else {
            return (
                <div className="zero-state">
                    <div className="placeholder">
                        <span>Looks like you don't have any contacts yet, click below to start adding contacts.</span>
                    </div>
                    <AddContactButton />
                </div>
            )
        }
    }
}

export default Chats;