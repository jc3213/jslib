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
let aria2 = new Aria2(scheme, host, secret);
```
#### Code Sample
```javascript
let aria2 = new Aria2("http", "localhost:6800/jsonrpc", "test.password");
```
- scheme
    - *required*
    - `http`, `https`, `ws`, and `wss` 
- host
    - *required*
    - `hostname:port`
- secret
    - *optional*
    - string, secret token of aria2 json-rpc

## Method
- [method](#method)
- [secret](#secret)
- [call](#call)
    - Use `WebSocket` or `HTTP Post` based on [scheme](#scheme)
- [send](#call)
    - Use `WebSocket` method only
- [post](#call)
    - Use `HTTP Post` method only

### method
```javascript
aria2.method = scheme;
```
- ##### scheme
- `http`, `https`, `ws`, and `wss`
### secret
```javascript
aria2.secret = "token:" + secret;
```
- secret
    - string, secret token of aria2 json-rpc
### call
```javascript
let result = aria2.call({ method, params });
let result = aria2.call({ method, params }, { method, params });
```
#### Code Sample
```javascript
let result = aria2.call({ method: "aria2.addUri", params: [["https://github.com/jc3213/jslib/archive/refs/heads/main.zip"], {out: "jslib.main.zip"}] });
```
- result
    - `Promise` object, return an array that contains the response from jsonrpc if fulfilled
- method **required**
    - Read [RPC method calls](https://aria2.github.io/manual/en/html/aria2c.html#methods)
- params **optional**
    - JSON-RPC method call parameters
