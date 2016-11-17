import React from 'react';
import SetupProfile from './setup-profile.react';
import {defaultStore} from '../flux/default-store';

class MainContainer extends React.Component {
    constructor(props) {
        super();
        this.state = this._getState();
        this._handleStoreChange = this._handleStoreChange.bind(this);
    }

    _getState() {
        return  {
            activeView: defaultStore.activeView
        };
    }

    render() {
        require('./main.scss');
        return (
            <div className="main-container">
                {this._renderActiveView()}
            </div>
        );
    }

    _renderActiveView() {
        switch (this.state.activeView) {
            case 'setup-profile':
                return <SetupProfile/>;

            default:
                return <p>Some other view</p>;
        }
    }

    componentDidMount() {
        defaultStore.addChangeListener(this._handleStoreChange);
    }

    componentWillUnmount() {
        defaultStore.removeChangeListener(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(this._getState());
    }
}

export default MainContainer;