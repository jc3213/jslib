## How to Use
### HTML
```HTML
<script src="filereader.js"></script>
```
### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/lib/filereader.js
```
## Syntax
```javascript
const reader = new JSLib_FileReader(file);
```
### `file`
A javascript `File` object
## Method
### `reader.text()`
Return a promise object, which returns the contents of the file as a text `string` if fulfilled
### `reader.dataURL()`
Return a promise object, which returns a `data:` URL representing the file's content if fulfilled
### `reader.arrayBuffer()`
Return a promise object, which returns an `ArrayBuffer` representing the file's content if fulfilled
### `reader.binaryString()`
Return a promise object, which returns the raw binary `string` data of the file's content if fulfilled
### `reader.json()`
Return a promise object, which returns the contents of the file as a `JSON` object if fulfilled
### `reader.base64()`
Return a promise object, which returns base64 encoded `string` of the file's content if fulfilled
