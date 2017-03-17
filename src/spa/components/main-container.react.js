import React from 'react';
import SetupProfile from './setup-profile.react';
import './main.scss';

class MainContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="main-container">
                <SetupProfile/>
            </div>
        );
    }
}

export default MainContainer;