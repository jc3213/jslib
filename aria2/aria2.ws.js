class Aria2WS {
    constructor (url, secret) {
        this.jsonrpc = url;
        this.secret = `token:${secret}`;
        this.websocket = this.connect(url.replace('http', 'ws'));
    }
    connect (url) {
        return new Promise((resolve, reject) => {
            const websocket = new WebSocket(url);
            websocket.onopen = (event) => resolve(websocket);
            websocket.onerror = (error) => reject(error);
        });
    }
    disconnect () {
        this.websocket.then((websocket) => websocket.close());
    }
    set onmessage (callback) {
        this.websocket.then((websocket) => websocket.addEventListener('message', (event) => callback(JSON.parse(event.data))));
    }
    send (message) {
        return new Promise((resolve, reject) => {
            this.websocket.then((websocket) => {
                websocket.onmessage = (event) => resolve(JSON.parse(event.data));
                websocket.onerror = (error) => reject(error);
                websocket.send(message);
            });
        }).then(({result, error}) => { if (result) { return result; } throw error; });
    }
}
