class Aria2 {
    constructor (url, secret) {
        const [protocol, http, socket] = url.match(/(https?)|(wss?)|([^:]+)/);
        this.post = http ? this.fetch : socket ? this.websocket : this.error(`Invalid protocol: "${protocol}" is not supported.`);
        this.jsonrpc = url;
        this.secret = `token:${secret}`;
    }
    call (...args) {
        const json = args.map( ({method, params = []}) => ({ id: '', jsonrpc: '2.0', method, params: [...this.jsonrpc.params, ...params] }) );
        return this.post(JSON.stringify(json));
    }
    error (message) {
        throw new Error(message);
    }
    fetch (body) {
        return fetch(this.jsonrpc, {method: 'POST', body}).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        });
    }
    websocket (message) {
        return new Promise((resolve, reject) => {
            const socket = new WebSocket(this.jsonrpc);
            socket.onopen = (event) => socket.send(message);
            socket.onclose = reject;
            socket.onmessage = (event) => {
                socket.close();
                resolve(JSON.parse(event.data));
            };
        });
    }
}
