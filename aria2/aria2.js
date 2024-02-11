class Aria2 {
    constructor (scheme, host, secret) {
        this._host = host;
        this.scheme = scheme;
        this.secret = secret;
        this.connect();
    }
    set scheme (scheme) {
        const methods = { 'http': this.fetch, 'https': this.fetch, 'ws': this.send, 'wss': this.send };
        this._scheme = scheme;
        this._jsonrpc = `${scheme}://${this._host}/jsonrpc`;
        this.post = methods[scheme];
        if (!this.post) { throw new Error(`Invalid protocol: "${scheme}" is not supported.`); }
    }
    set host (host) {
        this._host = host;
        this._jsonrpc = `${this._scheme}://${host}/jsonrpc`;
        this.disconnect().then(() => {
            this.connect();
            this.websocket.then( (websocket) => this.onmessage = this.messager );
        });
    }
    set secret (secret) {
        this._secret = `token:${secret}`;
    }
    connect () {
        return this.websocket = new Promise((resolve, reject) => {
            const websocket = new WebSocket(this._jsonrpc.replace('http', 'ws'));
            websocket.onopen = (event) => resolve(websocket);
            websocket.onerror = (error) => reject(error);
        });
    }
    disconnect () {
        return this.websocket.then( (websocket) => websocket.close() );
    }
    set onmessage (callback) {
        if (typeof callback !== 'function') { return; }
        this.messager = callback;
        this.websocket.then( (websocket) => websocket.addEventListener('message', (event) => this.messager(JSON.parse(event.data))) );
    }
    send (message) {
        return new Promise((resolve, reject) => {
            this.websocket.then((websocket) => {
                websocket.onmessage = (event) => resolve(JSON.parse(event.data));
                websocket.onerror = (error) => reject(error);
                websocket.send(message);
            });
        });
    }
    fetch (body) {
        return fetch(this._jsonrpc, {method: 'POST', body}).then((response) => {
            if (response.ok) { return response.json(); }
            throw new Error(response.statusText);
        });
    }
    call (...messages) {
        const json = messages.map( ({method, params = []}) => ({ id: '', jsonrpc: '2.0', method, params: [this._secret, ...params] }) );
        return this.post(JSON.stringify(json)).then( (response) => response.map(({result, error}) => { if (result) { return result; } throw error; }) );
    }
}
