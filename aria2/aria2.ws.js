class Aria2WebSocket {
    constructor (url, secret) {
        this.jsonrpc = url;
        this.secret = `token:${secret}`;
        this.connect();
    }
    connect (url) {
        this.websocket =  new Promise((resolve, reject) => {
            const websocket = new WebSocket(this.jsonrpc);
            websocket.onopen = (event) => resolve(websocket);
            websocket.onerror = (error) => reject(error);
        });
    }
    disconnect () {
        return this.websocket.then((websocket) => new Promise((resolve, reject) => {
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
        const message = JSON.stringify(messages.map( ({method, params = []}) => ({ id: '', jsonrpc: '2.0', method, params: [this.secret, ...params] }) ));
        return new Promise((resolve, reject) => {
            this.websocket.then((websocket) => {
                websocket.onmessage = (event) => resolve(JSON.parse(event.data));
                websocket.onerror = (error) => reject(error);
                websocket.send(message);
            });
        });
    }
}
