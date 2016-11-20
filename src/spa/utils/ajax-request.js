import $ from 'jquery';
import {LocalStorageKeys} from './local-storage-keys';

class AjaxRequest {

    constructor(setHeaders) {
        this._setHeaders = setHeaders;
    }

    get(options) {
        this._requestGet(options.url, options.success, options.error);
    }

    post(options) {
        this._requestPost(options.url, options.data, options.success, options.error);
    }

    _requestGet(url, success, error) {
        $.ajax({
            url,
            method: 'GET',
            beforeSend: this._setHeaders,
            success,
            error
        });
    }

    _requestPost(url, requestData, success, error) {
        $.ajax({
            url,
            method: 'POST',
            beforeSend: this._setHeaders,
            dataType: 'json',
            contentType: 'application/json',
            jsonp: false,
            data: JSON.stringify(requestData),
            success,
            error
        });
    }

    _setHeaders() {

    }
}

class StandardAjaxRequest extends AjaxRequest {

    _setHeaders(request) {
        super._setHeaders(request);
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.setRequestHeader('Pragma', 'no-cache');
    }
}

class SecureAjaxRequest extends StandardAjaxRequest {

    _setHeaders(request) {
        super._setHeaders(request);
        let token = LocalStorageKeys.authToken;
        if (token !== null) {
            request.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    }
}

const standardAjaxRequest = new StandardAjaxRequest();
const secureAjaxRequest = new SecureAjaxRequest();

export {standardAjaxRequest, secureAjaxRequest}