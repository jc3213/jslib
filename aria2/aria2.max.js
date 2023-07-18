class Aria2 {
    constructor (url, secret) {
        const [protocol, http, socket] = url.match(/(^http)s?|^(ws)s?|^([^:]+)/);
        this.post = http ? this.fetch : socket ? this.websocket : this.error(protocol);
        this.jsonrpc = url;
        this.params = secret ? [`token:${secret}`] : [];
    }
    error (protocol) {
        throw new Error(`Invalid protocol: "${protocol}" is not supported.`);
    }
    call (method, ...options) {
        const json = {id: '', jsonrpc: '2.0', method, params: [...this.params, ...options]};
        return this.post(JSON.stringify(json)).then(({result, error}) => {
            if (result) {
                return result;
            }
            throw error;
        });
    }
    batch (array) {
        const json = array.map(([method, ...options]) => ({id: '', jsonrpc: '2.0', method, params: [...this.params, ...options]}));
        return this.post(JSON.stringify(json)).then((response) => {
            return response.map(({result, error}) => {
                if (result) {
                    return result;
                }
                throw error;
            });
        });
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
    addUri (url, options = {}) {
        const urls = Array.isArray(url) ? url : [url];
        const sessions = urls.map((url) => ({id: '', jsonrpc: '2.0', method: 'aria2.addUri', params: [...this.params, [url], options]}));
        return this.post(JSON.stringify(sessions));
    }
    addTorrent (torrent) {
        const torrents = Array.isArray(torrent) ? torrent : [torrent];
        const sessions = torrents.map((torrent) => ({id: '', jsonrpc: '2.0', method: 'aria2.addTorrent', params: [...this.params, torrent]}));
        return this.post(JSON.stringify(sessions));
    }
    addMetalink (metalink, options = {}) {
        const metalinks = Array.isArray(metalink) ? metalink : [metalink];
        const sessions = torrents.map((metalink) => ({id: '', jsonrpc: '2.0', method: 'aria2.addMetalink', params: [...this.params, metalink, options]}));
        return this.post(JSON.stringify(sessions));
    }
}
