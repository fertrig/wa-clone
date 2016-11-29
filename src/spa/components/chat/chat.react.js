import React from 'react';
import {chatStore} from '../../flux/chat/chat-store';
import {SecureAjaxRequest} from '../../utils/ajax-request';
import {ApiUrls} from '../../utils/api-urls';
import {ChatActions} from '../../flux/chat/chat-actions';

class Chat extends React.Component {
    constructor(props) {
        super();
        this.state = this._getState(props);
        this._handleStoreChange = this._handleStoreChange.bind(this);
        this._handleNewMessage = this._handleNewMessage.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
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
                <div className="messages">
                    {this.state.messages.map((message, index) => {
                        return (
                            <div key={index} className="message">
                                {message}
                            </div>
                        );
                    })}
                </div>
                <div className="textbox">
                    <input
                        type="text"
                        placeholder="Enter message"
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