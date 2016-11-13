import React from 'react';

class MainContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    render() {
        require('./main.scss');
        return (
            <div className="main-container">
            </div>
        );
    }
}

export default MainContainer;