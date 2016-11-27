import React from 'react';
import SetupProfile from './profile/setup-profile.react';
import {defaultStore} from '../flux/default/default-store';
import {mainViews} from '../enums/main-views';
import {modalKeys} from '../enums/modal-keys';
import Chats from './chat/chats.react';
import Modal from './modal.react';
import AddContact from './chat/add-contact.react';

class MainContainer extends React.Component {
    constructor(props) {
        super();
        this.state = this._getState();
        this._handleStoreChange = this._handleStoreChange.bind(this);
    }

    _getState() {
        return {
            mainView: defaultStore.mainView,
            modalKey: defaultStore.modalKey
        };
    }

    render() {
        require('./main.scss');
        return (
            <div className="main-container">
                {this._renderMainView()}
                {this._renderModal()}
            </div>
        );
    }

    _renderMainView() {
        switch (this.state.mainView) {
            case mainViews.setupProfile:
                return <SetupProfile/>;

            case mainViews.chats:
                return <Chats />;

            default:
                throw new Error(`unexpected main view ${this.state.mainView}`);
        }
    }

    _renderModal() {
        return (
            <Modal isOpen={this.state.modalKey !== null}>
                {this._renderModalChildren()}
            </Modal>
        )
    }

    _renderModalChildren() {
        switch (this.state.modalKey) {
            case modalKeys.addContact:
                return <AddContact />;

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