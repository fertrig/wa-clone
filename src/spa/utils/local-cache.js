class LocalCache {

    static getString(key) {
        return localStorage.getItem(key);
    }

    static setString(key, value) {
        try {
            localStorage.setItem(key, value);
            // console.log(`${key} set to localStorage with value ${value}`);
            console.log(`${key} set to localStorage`);
        }
        catch(err) {
            console.error(err, 'localStorage may seem full, please clean up some keys');
            throw err;
        }
    }

    static getObject(key) {
        return JSON.parse(this.getString(key));
    }

    static setObject(key, value) {
        this.setString(key, JSON.stringify(value));
    }
}

export {LocalCache}