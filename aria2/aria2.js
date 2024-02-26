class Aria2 {
    constructor (scheme, url, secret) {
        this._url = url;
        this.scheme = scheme;
        this.secret = secret;
    }
    set scheme (scheme) {
        const methods = { 'http': this.post, 'https': this.post, 'ws': this.send, 'wss': this.send };
        if (methods[scheme] === undefined) { throw new Error('Invalid method: ' + scheme + ' is not supported!'); }
        this._jsonrpc = scheme + '://' + this._url;
        this._scheme = scheme;
        this.call = methods[scheme];
    }
    get scheme () {
        return this._scheme;
    }
    set url (url) {
        this.disconnect().then((event) => {
            this._jsonrpc = this._scheme + '://' + url;
            this._url = url;
            this.connect();
        });
    }
    get url () {
        return this._url;
    }
    get jsonrpc () {
        return this._jsonrpc;
    }
    connect () {
        this.websocket = new Promise((resolve, reject) => {
            const websocket = new WebSocket(this.jsonrpc.replace('http', 'ws'));
            websocket.onopen = (event) => resolve(websocket);
            websocket.onerror = (error) => reject(error);
        });
    }
    disconnect () {
        this.websocket.then((websocket) => new Promise((resolve, reject) => {
            websocket.onclose = (event) => resolve(event);
            websocket.onerror = (error) => reject(error);
            websocket.close();
        }));
    }
    set onmessage (callback) {
        if (typeof callback !== 'function') { return; }
        if (this._onmessage === undefined) { this.websocket.then( (websocket) => websocket.addEventListener('message', (event) => this._onmessage(JSON.parse(event.data))) ); }
        this._onmessage = callback;
    }
    get onmessage () {
        return this._onmessage;
    }
    send (...messages) {
        return this.websocket.then((websocket) => new Promise((resolve, reject) => {
            websocket.onmessage = (event) => resolve(JSON.parse(event.data));
            websocket.onerror = (error) => reject(error);
            websocket.send(this.json(messages));
        }));
    }
    post (...messages) {
        return fetch(this.jsonrpc, {method: 'POST', body: this.json(messages)}).then((response) => {
            if (response.ok) { return response.json(); }
            throw new Error(response.statusText);
        });
    }
    json (array) {
        const json = array.map( ({method, params = []}) => ({ id: '', jsonrpc: '2.0', method, params: [this.secret, ...params] }) );
        return JSON.stringify(json);
    }
}
