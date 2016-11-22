import React from 'react';
import ProfileEditor from './profile-editor.react';
import SubmitButton from './submit-button.react';
import {requestStates} from '../../enums/request-states';
import {DefaultActions} from '../../flux/default/default-actions';
import {mainViews} from '../../enums/main-views';
import {standardAjaxRequest} from '../../utils/ajax-request';
import {ApiUrls} from "../../utils/api-urls";
import {LocalStorageKeys} from "../../utils/local-storage-keys";

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
                {this._renderContents()}
            </div>
        )
    }

    _renderContents() {

        switch (this.state.requestState) {
            case requestStates.default:
            case requestStates.fetching:

                const isFetching = this.state.requestState === requestStates.fetching;

                return (
                    <div>
                        <ProfileEditor
                            handle={this.state.handle}
                            name={this.state.name}
                            onHandleChange={this._handleHandleChange}
                            onNameChange={this._handleNameChange}/>
                        <SubmitButton
                            text={isFetching ? 'Submitting...' : 'Submit' }
                            enabled={!isFetching}
                            onSubmit={this._submitProfile}/>
                    </div>
                );

            case requestStates.success:
                return (
                    <div className="prompt">
                        <span>Your profile has been saved. Your handle name is {this.state.handle}.</span>
                    </div>
                );

            case requestStates.hasError:
                return (
                    <div className="prompt">
                        <span>There was an error. Please reload.</span>
                    </div>
                );
        }
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

        const user = {
            handle: this.state.handle,
            name: this.state.name
        };

        standardAjaxRequest.post({
            url: ApiUrls.user(),
            data: user,
            success: (res) => {
                localStorage.setItem(LocalStorageKeys.authToken, res.token);
                localStorage.setItem(LocalStorageKeys.user, JSON.stringify(user));
                console.log(`auth token saved to localStorage key ${LocalStorageKeys.authToken}`);
                console.log('user', user);
                this.setState({
                    requestState: requestStates.success
                });

                global.setTimeout(() => {
                    DefaultActions.changeMainView(mainViews.chats);
                }, 500);
            },
            error: () => {
                console.log(...arguments);
                this.setState({
                    requestState: requestStates.hasError
                });
            }
        });
    }
}

export default SetupProfile;