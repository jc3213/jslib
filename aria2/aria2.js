class Aria2 {
    constructor (scheme, host, secret) {
        this.host = host;
        this.secret = 'token:' + secret;
        this.method = scheme;
        this.connect();
    }
    set method (scheme) {
        const methods = { 'http': this.fetch, 'https': this.fetch, 'ws': this.send, 'wss': this.send };
        this.jsonrpc = scheme + '://' + this.host + '/jsonrpc';
        this.call = methods[scheme];
        if (!this.call) { throw new Error('Invalid method: ' + scheme + ' is not supported!'); }
    }
    connect () {
        this.websocket = new Promise((resolve, reject) => {
            const websocket = new WebSocket(this.jsonrpc.replace('http', 'ws'));
            websocket.onopen = (event) => resolve(websocket);
            websocket.onerror = (error) => reject(error);
        });
    }
    disconnect () {
        this.websocket.then( (websocket) => websocket.close() );
    }
    set onmessage (callback) {
        this.websocket.then( (websocket) => websocket.addEventListener('message', (event) => callback(JSON.parse(event.data))) );
    }
    messager (entry, callback) {
        const json = entry.map( ({method, params = []}) => ({ id: '', jsonrpc: '2.0', method, params: [this.secret, ...params] }) );
        return callback(JSON.stringify(json)).then((response) => {
            return response.map( ({result, error}) => { if (result) { return result; } throw error; } );
        });
    }
    send (...entry) {
        return this.messager(entry, (message) => new Promise((resolve, reject) => {
            this.websocket.then((websocket) => {
                websocket.onmessage = (event) => resolve(JSON.parse(event.data));
                websocket.onerror = (error) => reject(error);
                websocket.send(message);
            });
        }));
    }
    fetch (...entry) {
        return this.messager(entry, (body) => fetch(this.jsonrpc, {method: 'POST', body}).then((response) => {
            if (response.ok) { return response.json(); } throw new Error(response.statusText);
        }));
    }
}
