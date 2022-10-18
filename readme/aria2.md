## Usage

#### Download
[Latest](https://raw.githubusercontent.com/jc3213/jslib/main/js/aria2.js)

#### HTML
```HTML
<script src="aria2.js"></script>
```

#### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/js/aria2.js
```

## Syntax
```javascript
const aria2 = new Aria2(jsonrpc, secret);
```

### `jsonrpc` `*required`
Address of aria2 JSON-RPC, only support `http`, `https`, `ws`, and `wss` protocols

### `secret` `Optional`
Secret token of aria2 JSON-RPC

## Method
```javascript
const result = aria2.message(method, params);
```

### `result`
Promise object, returns the response from jsonrpc as an `object` if fulfilled

### `method` `*required`
Read [RPC method calls](https://aria2.github.io/manual/en/html/aria2c.html#methods)

### `params` `Optional`
An array contains RPC method call parameters
