## How to Use
### HTML
```HTML
<script src="filereader.js"></script>
```
### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/js/filereader.js
```
## Syntax
```javascript
const reader = new PromiseFileReader(file);
```
```javascript
const reader = new PromiseFileReader();
reader.file = file;
```
### `file`
The javascript `File` object
## Method
### `reader.text()`
Promise object, which returns the contents of the file as a text `string` if fulfilled
### `reader.dataURL()`
Promise object, which returns a `data:` URL representing the file's content if fulfilled
### `reader.arrayBuffer()`
Promise object, which returns an `ArrayBuffer` representing the file's content if fulfilled
### `reader.binaryString()`
Promise object, which returns the raw binary `string` data of the file's content if fulfilled
### `reader.json()`
Promise object, which returns the contents of the file as a `JSON` object if fulfilled
### `reader.base64()`
Promise object, which returns base64 encoded `string` of the file's content if fulfilled
