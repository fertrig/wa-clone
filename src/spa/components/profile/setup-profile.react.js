import React from 'react';
import ProfileEditor from './profile-editor.react';
import RequestSubmitButton from '../common/request-submit-button.react';
import RequestMessage from '../common/request-message.react';
import {requestStates} from '../../enums/request-states';
import {StandardAjaxRequest} from '../../utils/ajax-request';
import {ApiUrls} from '../../utils/api-urls';
import {LocalCache} from '../../utils/local-cache';
import {LocalCacheKeys} from '../../utils/local-cache-keys';
import {DefaultActions} from '../../flux/default/default-actions';

class SetupProfile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            handle: '',
            name: '',
            requestState: requestStates.default
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
                <RequestMessage
                    requestState={this.state.requestState}/>
                <RequestSubmitButton
                    requestState={this.state.requestState}
                    onSubmit={this._submitProfile}/>
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
        this.setState({
            requestState: requestStates.fetching
        });

        const request = new StandardAjaxRequest();
        const user = {
            handle: this.state.handle,
            name: this.state.name
        };

        request.post({
            url: ApiUrls.user(),
            data: user,
            success: (res) => {

                LocalCache.setString(LocalCacheKeys.authToken(), res.token);
                LocalCache.setObject(LocalCacheKeys.user(), user);

                this.setState({
                    requestState: requestStates.success
                });

                global.setTimeout(() => {
                    DefaultActions.goToChatsView();
                }, 750);
            },
            error: (err) => {
                console.log(err);
                this.setState({
                    requestState: requestStates.hasError
                });
            }
        });
    }
}

export default SetupProfile;