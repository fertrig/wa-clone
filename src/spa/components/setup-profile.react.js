import React from 'react';
import ProfileEditor from './profile-editor.react';
import $ from 'jquery';
import urlJoin from 'url-join';

class SetupProfile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            handle: '',
            name: ''
        };
        this._handleHandleChange = this._handleHandleChange.bind(this);
        this._handleNameChange = this._handleNameChange.bind(this);
        this._submitProfile = this._submitProfile.bind(this);
    }

    render() {

        require('./setup-profile.scss');
        return (
            <div className="setup-profile">
                <ProfileEditor
                    handle={this.state.handle}
                    name={this.state.name}
                    onHandleChange={this._handleHandleChange}
                    onNameChange={this._handleNameChange}/>
                <div className="submit" onClick={this._submitProfile}>Submit</div>
            </div>
        )
    }

    _handleHandleChange(event) {
        this.setState({
            handle: event.target.value
        });
    }

    _handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    _submitProfile() {
        $.ajax({
            url: urlJoin(global.__apiUrl__, 'user'),
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            data: JSON.stringify({
                handle: this.state.handle,
                name: this.state.name
            }),
            success: (res) => {
                console.log(res);
            },
            error: () => {
                console.log(...arguments);
            }
        });
    }
}

export default SetupProfile;