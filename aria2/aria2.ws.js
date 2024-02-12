class Aria2WS {
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
        this.websocket.then( (websocket) => websocket.close() );
    }
    set onmessage (callback) {
        this.websocket.then( (websocket) => websocket.addEventListener('message', (event) => callback(JSON.parse(event.data))) );
    }
    send (...messages) {
        const message = JSON.stringify(messages.map( ({method, params = []}) => ({ id: '', jsonrpc: '2.0', method, params: [this.secret, ...params] }) ));
        return new Promise((resolve, reject) => {
            this.websocket.then((websocket) => {
                websocket.onmessage = (event) => resolve(JSON.parse(event.data));
                websocket.onerror = (error) => reject(error);
                websocket.send(message);
            });
        }).then( (json) => json.map( ({result, error}) => { if (result) { return result; } throw error; } ) );
    }
}
