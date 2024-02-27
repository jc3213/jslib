class Aria2XMLRequest {
    constructor (url, secret) {
        this.jsonrpc = url;
        this.secret = `token:${secret}`;
    }
    get (...messages) {
        return fetch(this.jsonrpc + '?' + btoa(this.json(messages))).then((response) => {
            if (response.ok) { return response.json(); } throw new Error(response.statusText);
        }).then(this.proc);
    }
    post (...messages) {
        return fetch(this.jsonrpc, {method: 'POST', body: this.json(messages)}).then((response) => {
            if (response.ok) { return response.json(); } throw new Error(response.statusText);
        }).then(this.proc);
    }
    json (array) {
        return JSON.stringify(array.map( ({method, params = []}) => ({ id: '', jsonrpc: '2.0', method, params: [this.secret, ...params] }) ));
    }
    proc (array) {
        return array.map( ({result, error}) => { if (result) { return result; } throw error; } );
    }
}
