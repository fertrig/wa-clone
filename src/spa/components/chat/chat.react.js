import React from 'react';
import {chatStore} from '../../flux/chat/chat-store';
import {SecureAjaxRequest} from '../../utils/ajax-request';
import {ApiUrls} from '../../utils/api-urls';
import {ChatActions} from '../../flux/chat/chat-actions';
import {DefaultActions} from '../../flux/default/default-actions';
import classnames from 'classnames';
import './chat.scss';

class Chat extends React.Component {
    constructor(props) {
        super();
        this.state = this._getState(props);
        this._handleStoreChange = this._handleStoreChange.bind(this);
        this._handleNewMessage = this._handleNewMessage.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._goBack = this._goBack.bind(this);
    }

    _getState(props) {
        return {
            messages: chatStore.getMessages(props.handle),
            newMessage: ''
        };
    }

    render() {
        return (
            <div className="chat">
                <div className="header">
                    <div className="back" onClick={this._goBack}>
                        <span>&lt;</span>
                    </div>
                    <div className="contact-initial">
                        <span>{this.props.handle.substring(0,1)}</span>
                    </div>
                    <div className="contact-name">
                        <span>{this.props.handle}</span>
                    </div>
                </div>
                <div className="messages">
                    {this.state.messages.map((message, index) => {
                        const mineOrYours = chatStore.iAmSender(message.sender) ? 'mine' : 'yours';
                        const messageClasses = classnames('message', mineOrYours);
                        return (
                            <div key={index} className="message-container">
                                <div className={messageClasses}>
                                    <span>{message.content}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="message-input-container">
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={this.state.newMessage}
                        onChange={this._handleNewMessage}
                        onKeyPress={this._handleKeyPress}/>
                </div>
            </div>
        );
    }

    _handleNewMessage(event) {
        this.setState({
            newMessage: event.target.value
        });
    }

    _handleKeyPress(event) {
        if (event.key === 'Enter') {
            const request = new SecureAjaxRequest();

            const message = {
                receiver: this.props.handle,
                content: this.state.newMessage
            };

            request.post({
                url: ApiUrls.message(),
                data: message,
                success: (res) => {
                    console.log(res);
                    ChatActions.processFact(res);
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }
    }

    _goBack() {
        DefaultActions.showChats();
    }

    componentDidMount() {
        chatStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnmount() {
        chatStore.removeChangeListener(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(this._getState(this.props));
    }
}

export default Chat;