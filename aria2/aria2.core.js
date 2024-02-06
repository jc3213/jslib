class Aria2 {
    constructor (url, secret) {
        const [protocol, http, socket] = url.match(/(https?)|(wss?)|([^:]+)/);
        this.post = http ? this.fetch : socket ? this.send : this.handler({error: new Error(`Invalid protocol: "${protocol}" is not supported.`)});
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
    handler ({result, error}) {
        if (result) {
            return result;
        }
        throw error;
    }
    message (method, ...options) {
        return {id: '', jsonrpc: '2.0', method, params: [this.secret, ...options]};
    }
    call (...message) {
        const json = this.message(...message);
        return this.post(JSON.stringify(json)).then(this.handler);
    }
    batch (...messages) {
        const json = messages.map(message => this.message(...message));
        return this.post(JSON.stringify(json)).then((response) => response.map(this.handler));
    }
    fetch (body) {
        return fetch(this.jsonrpc, {method: 'POST', body}).then((response) => {
            if (response.ok) { return response.json(); }
            throw new Error(response.statusText);
        });
    }
    send (message) {
        return new Promise(async (resolve, reject) => {
            const websocket = await this.websocket;
            websocket.onmessage = (event) => resolve(JSON.parse(event.data));
            websocket.onerror = (error) => reject(error);
            websocket.send(message);
        });
    }
    addUri (url, options = {}) {
        const urls = Array.isArray(url) ? url : [url];
        const sessions = urls.map((url) => ({id: '', jsonrpc: '2.0', method: 'aria2.addUri', params: [this.secret, [url], options]}));
        return this.post(JSON.stringify(sessions));
    }
    addTorrent (torrent) {
        const torrents = Array.isArray(torrent) ? torrent : [torrent];
        const sessions = torrents.map((torrent) => ({id: '', jsonrpc: '2.0', method: 'aria2.addTorrent', params: [this.secret, torrent]}));
        return this.post(JSON.stringify(sessions));
    }
    addMetalink (metalink, options = {}) {
        const metalinks = Array.isArray(metalink) ? metalink : [metalink];
        const sessions = torrents.map((metalink) => ({id: '', jsonrpc: '2.0', method: 'aria2.addMetalink', params: [this.secret, metalink, options]}));
        return this.post(JSON.stringify(sessions));
    }
}
