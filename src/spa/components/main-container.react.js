import React from 'react';
import SetupProfile from './profile/setup-profile.react';
import {defaultStore} from '../flux/default/default-store';
import {mainViews} from '../flux/default/main-views';
import Chats from './chat/chats.react';

class MainContainer extends React.Component {
    constructor(props) {
        super();
        this.state = this._getState();
        this._handleStoreChange = this._handleStoreChange.bind(this);
    }

    _getState() {
        return  {
            mainView: defaultStore.mainView
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
        switch (this.state.mainView) {
            case mainViews.setupProfile:
                return <SetupProfile/>;

            case mainViews.chats:
                return <Chats />;

            default:
                throw new Error(`unexpected main view ${this.state.mainView}`)
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