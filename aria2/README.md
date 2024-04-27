## Usage

### Download
[Latest](https://jc3213.github.io/jslib/aria2/aria2.js)

### HTML
```HTML
<script src="https://jc3213.github.io/jslib/aria2/aria2.js"></script>
```

### TamperMonkey
```javascript
// @require https://jc3213.github.io/jslib/aria2/aria2.js
```

## Syntax
```javascript
let aria2 = new Aria2(scheme, url, secret);
```
```javascript
let aria2 = new Aria2(jsonrpc, secret);
```
```javascript
let aria2 = new Aria2(jsonrpcWithSecret);
```

- [scheme](#scheme) + [url](#url)
    - *required*
- jsonrpc
    - *required*
- [secret](#secret)
    - *optional*

## Getter & Setter
- [scheme](#scheme)
- [url](#url)
- [secret](#secret)
- [onmessage](#onmessage)
- [onclose](#onclose)

### scheme
```javascript
console.log(aria2.scheme); // current scheme
aria2.scheme = scheme; // set new scheme
```
- scheme
    - `http`, `https`, `ws`, and `wss`

### url
```javascript
console.log(aria2.url); // current url
aria2.url = url; // set new url
```
- url
    - `${hostname}:${port}/jsonrpc`
- hostname
    - `www.example.com`
- port
    - `6800` *default*

### secret
```javascript
console.log(aria2.secret); // current secret token
aria2.secret = secret; // set new secret token
```
- secret
    - `string`, secret token of aria2 json-rpc
    - returns `token:${secret}`

### onmessage
```javascript
console.log(aria2.onmessage); // current message event listener
aria2.onmessage = callback; // set new message event listener
```
- Handle the event when `WebSocket` message is recieved
- callback
    - `function`, (response: object) => void
    - returns `${callback}`
    - Used for JSON-RPC over WebSocket notifications

### onclose
```javascript
console.log(aria2.onclose); // current message event listener
aria2.onclose = callback; // set new message event listener
```
- Handle the event when `WebSocket` connection is closed
- callback
    - `function`, (response: object) => void
    - returns `${callback}`
    - It will run when WebSocket connection is closed

## Method
- [call](#call)
    - Use `WebSocket` or `HTTP Post` based on [scheme](#scheme)
- [send](#call)
    - Use `WebSocket` method only
- [post](#call)
    - Use `HTTP Post` method only

### call
```javascript
let response = aria2.call({ method, params });
```
```javascript
let response = aria2.call({ method, params }, { method, params }, ..., { method, params });
```

- response
    - `Promise` object, return an array that contains the response from jsonrpc if fulfilled
- method **required**
    - Read [RPC method calls](https://aria2.github.io/manual/en/html/aria2c.html#methods)
- params **optional**
    - JSON-RPC method call parameters

### Code Sample
```javascript
let jsonrpc = {};
let session = {};
let aria2 = new Aria2("http://localhost:6800/jsonrpc#mysecret");
aria2.onmessage = aria2WebsocketNotification;
aria2.onclose = aria2ClientInitiate;
aria2ClientInitiate();

function aria2ClientInitiate() {
    session.all = {};
    session.active = {};
    session.waiting = {};
    session.stopped = {};
    aria2.call(
        {method: 'aria2.getGlobalOption'},
        {method: 'aria2.getVersion'},
        {method: 'aria2.getGlobalStat'},
        {method: 'aria2.tellActive'},
        {method: 'aria2.tellWaiting', params: [0, 999]},
        {method: 'aria2.tellStopped', params: [0, 999]}
    ).then((response) => {
        let [global, version, stats, active, waiting, stopped] = response;
        jsonrpc.options = global.result;
        jsonrpc.version = version.result;
        active.result.forEach((result) => session.active[result.gid] = session.all[result.gid] = result);
        waiting.result.forEach((result) => session.waiting[result.gid] = session.all[result.gid] = result);
        stopped.result.forEach((result) => session.stopped[result.gid] = session.all[result.gid] = result);
    }).catch((error) => {
        retry = setTimeout(aria2JsonrpcInitiate, 50000);
    });
}

function aria2WebsocketNotification (response) {
    if (!response.method) { return; }
    let gid = response.params[0].gid;
    switch (method) {
        case 'aria2.onBtDownloadComplete':
            break;
       case 'aria2.onDownloadStart':
            console.log("Session #" + gid + " has started!"
            break;
       case 'aria2.onDownloadComplete':
           console.log("Session #" + gid + " has completed!"
       default:
            // For paused, waiting, complete, error, removed
            break;
    }
}
```
