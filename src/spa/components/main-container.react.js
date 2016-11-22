import React from 'react';
import SetupProfile from './profile/setup-profile.react';
import {defaultStore} from '../flux/default/default-store';
import {mainViews} from '../flux/default/main-views';
import {modals} from '../flux/default/modals';
import Chats from './chat/chats.react';
import Modal from './modal.react';
import AddContactEditor from './chat/add-contact-editor.react';

class MainContainer extends React.Component {
    constructor(props) {
        super();
        this.state = this._getState();
        this._handleStoreChange = this._handleStoreChange.bind(this);
    }

    _getState() {
        return  {
            mainView: defaultStore.mainView,
            modal: defaultStore.modal
        };
    }

    render() {
        require('./main.scss');
        return (
            <div className="main-container">
                {this._renderActiveView()}
                {this._renderModal()}
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

    _renderModal() {
        return (
            <Modal
                isOpen={this.state.modal !== null}>
                {this._renderModalContents()}
            </Modal>
        );
    }

    _renderModalContents() {
        switch (this.state.modal) {
            case modals.addContact:
                return <AddContactEditor />;

            default:
                return null;
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