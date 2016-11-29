class SocketUtils {
    static getUserNamespace(handle) {
        return `/socket/user/${handle}`;
    }
}

export {SocketUtils}