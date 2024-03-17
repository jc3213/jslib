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

#### Code Sample
```javascript
let aria2 = new Aria2("http", "localhost:6800/jsonrpc", "test.password");
```
```javascript
let aria2 = new Aria2("http://localhost:6800/jsonrpc", "test.password");
```
```javascript
let aria2 = new Aria2("http://localhost:6800/jsonrpc#test.password");
```
- [scheme](#scheme)
    - *required*
    - `http`, `https`, `ws`, and `wss` 
- [url](#url)
    - *required*
    - `${hostname}:${port}/jsonrpc`
- [secret](#secret)
    - *optional*
    - string, secret token of aria2 json-rpc

## Getter & Setter
- [scheme](#scheme)
- [url](#url)
- [secret](#secret)
- [onmessage](#onmessage)

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
- callback
    - `function`, (response: object) => void
    - returns `${callback}`
    - Used for JSON-RPC over WebSocket notifications

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
let response = aria2.call({ method, params }, { method, params }, ..., { method, params });
```

#### Code Sample
```javascript
let response = aria2.call({ method: "aria2.addUri", params: [["https://github.com/jc3213/jslib/archive/refs/heads/main.zip"], {out: "jslib.main.zip"}] });
```
- response
    - `Promise` object, return an array that contains the response from jsonrpc if fulfilled
- method **required**
    - Read [RPC method calls](https://aria2.github.io/manual/en/html/aria2c.html#methods)
- params **optional**
    - JSON-RPC method call parameters

## Event
- ##### onmessage
    - The event listener for `WebSocket` message event
```javascript
console.log(aria2.onmessage); // current event listener
aria2.onmessage = function (response) { do something with response; } // set new event listener
```
