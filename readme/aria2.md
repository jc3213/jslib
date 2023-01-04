## Usage

- Download
    - [Click to download](https://raw.githubusercontent.com/jc3213/jslib/main/js/aria2.js)
- TamperMonkey
    - `// @require https://raw.githubusercontent.com/jc3213/jslib/main/js/aria2.js`

## Syntax
```javascript
const aria2 = new Aria2(jsonrpc, secret);
```

- jsonrpc **required**
    - URL of aria2 JSON-RPC
    - Support protocols: `http`, `https`, `ws`, and `wss` 
- secret **optional**
    - Secret token of aria2 JSON-RPC

## Method
- [call](#call)
- [batch](#batch)

#### call
```javascript
const result = aria2.call(method, params);
```
- result
    - Promise object, returns the response from jsonrpc as an `object` if fulfilled
- method **required**
    - Read [RPC method calls](https://aria2.github.io/manual/en/html/aria2c.html#methods)
- params **optional**
    - An array contains RPC method call parameters

#### batch
```javascript
const result = aria2.batch(multi);
```
- result
    - Promise object, returns the response from jsonrpc as an `array` if fulfilled
- multi
    - An array of `object`, syntax {`method`, `params` }
    - method **required**
        - Read [RPC method calls](https://aria2.github.io/manual/en/html/aria2c.html#methods)
    - params **optional**
        - An array contains RPC method call parameters
