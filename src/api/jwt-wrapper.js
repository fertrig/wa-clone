import _jwt from 'jsonwebtoken';

class JwtWrapper {
    constructor(secret) {
        this._secret = secret;
    }

    sign(data) {
        return _jwt.sign(data, this._secret)
    }

    bearerToken(token) {
        return `Bearer ${token}`;
    }

    extractToken(bearerToken) {
        return bearerToken.substring('Bearer '.length);
    }

    verify(token) {
        return _jwt.verify(token, this._secret);
    }
}

const jwt = new JwtWrapper('some-secret-shhh');

export {jwt}