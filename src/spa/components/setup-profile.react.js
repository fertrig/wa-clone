import React from 'react';
import ProfileEditor from './profile-editor.react';

class SetupProfile extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    render() {

        require('./setup-profile.scss');
        return (
            <div className="setup-profile">
                <ProfileEditor handle="agentsmith" name="Luke Niles"/>
                <div className="submit">Submit</div>
            </div>
        )
    }
}

export default SetupProfile;