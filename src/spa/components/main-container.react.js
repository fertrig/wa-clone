import React from 'react';
import SetupProfile from './setup-profile.react';

class MainContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    render() {
        require('./main.scss');
        return (
            <div className="main-container">
                <SetupProfile/>
            </div>
        );
    }
}

export default MainContainer;