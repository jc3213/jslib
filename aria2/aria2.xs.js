class Aria2 {
    constructor (url, secret) {
        this.jsonrpc = url;
        this.secret = `token:${secret}`;
    }
    fetch (...messages) {
        const body = JSON.stringify(messages.map( ({method, params = []}) => ({ id: '', jsonrpc: '2.0', method, params: [this.secret, ...params]}) ));
        return fetch(this.jsonrpc, {method: 'POST', body}).then((response) => {
            if (response.ok) { return response.json(); }
            throw new Error(response.statusText);
        }).then( (json) => json.map( ({result, error}) => { if (result) { return result; } throw error; } ) );
    }
}
