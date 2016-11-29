import urlJoin from 'url-join';

const apiUrl = global.__apiUrl__;

class ApiUrls {

    static user() {
        return urlJoin(apiUrl, 'user');
    }

    static contact() {
        return urlJoin(apiUrl, 'contact');
    }

    static message() {
        return urlJoin(apiUrl, 'message');
    }
}

export {ApiUrls}