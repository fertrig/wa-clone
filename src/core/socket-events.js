class SocketEvents {

    static system() {
        return `system`;
    }

    static user(handle) {
        return `user|${handle}`;
    }

}

export {SocketEvents}