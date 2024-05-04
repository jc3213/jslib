## Usage

### Download
[0.1.0](https://jc3213.github.io/jslib/aria2/archive/aria2_0.1.0.js)
[0.2.0](https://jc3213.github.io/jslib/aria2/archive/aria2_0.2.0.js)

## Syntax
```javascript
let aria2 = new Aria2("http", "localhost:6800/jsonrpc", "mysecret");
```

## Method
- [call](#call)
    - Use `WebSocket` or `HTTP Post` based on [scheme](#scheme)
    - Send json-rpc request
- [batch](#batch)
    - Send batch json-rpc request


### call
```javascript
let response = aria2.call( method, ...options );
```
- response
    - `Promise` object, return an object of response from jsonrpc if fulfilled
- method **required**
    - Read [RPC method calls](https://aria2.github.io/manual/en/html/aria2c.html#methods)
- options **optional**
    - JSON-RPC method call parameters
 
### batch
```javascript
let response = aria2.batch([ [method, ...options] ]);
let response = aria2.batch([ [method, ...options], [method, ...options] ]);
```
- response
    - `Promise` object, return an array that contains the response from jsonrpc if fulfilled
