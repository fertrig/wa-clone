import urlJoin from 'url-join';

const apiUrl = global.__apiUrl__;

class ApiUrls {

    static user() {
        return urlJoin(apiUrl, 'user');
    }
}

export {ApiUrls}