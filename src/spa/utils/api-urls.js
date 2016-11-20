import urlJoin from 'url-join';

const baseUrl = global.__apiUrl__;

class ApiUrls {
    static user() {
        return urlJoin(baseUrl, 'user');
    }
}

export {ApiUrls}