class CookiesStorage {
    constructor () {
        this.storage = {};
        this.keys = [];
        this.values = [];
        this.cookies = document.cookie ? document.cookie.split(';') : [];
        this.length = this.cookies.length;
        this.cookies.forEach((cookie, offset) => {
            const [key, value] = cookie.split('=');
            key = key.trim();
            value = value.trim();
            this.keys.push(key);
            this.values.push(value);
            this.storage[key] = {offset, value};
        });
    }
    get (key) {
        return this.storage[key]?.value ?? '';
    }
    set (key, value) {
        const offset = this.storage[key]?.offset || this.length;
        this.length = this.length === offset ? offset + 1 : offset;
        this.values[offset] = value;
        this.storage[key] = {offset, value};
        this.cookies.splice(offset, 1, `${key}=${value}`);
    }
    commit () {
        document.cookie = this.cookies.join(';');
    }
    clear () {
        document.cookie = '';
        this.storage = {};
        this.keys = [];
        this.values = [];
        this.cookies = [];
        this.length = 0;
    }
}
