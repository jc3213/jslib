## Usage

### Download
[Latest](https://jc3213.github.io/jslib/filereader/filereader.js)

### HTML
```HTML
<script src="https://jc3213.github.io/jslib/filereader/filereader.js"></script>
```

### TamperMonkey
```javascript
// @require https://jc3213.github.io/jslib/filereader/filereader.js
```

## Syntax
```javascript
let promisedReader = new PromiseFileReader();
```

## Method
- [text](#text)
- [json](#json)
- [base64](#base64)
- [dataURL](#dataURL)
- [arrayBuffer](#arrayBuffer)
- [binaryString](#binaryString)

### text
```javascript
let testResult = promisedReader.text(file);
```
- textResult
    - Promise

### json
```javascript
let jsonResult = promisedReader.json(file);
```
- jsonResult
    - Promise

### base64
```javascript
let base64Result = promisedReader.base64(file);
```
- base64Result
    - Promise

### dataURL
```javascript
let dataResult = promisedReader.dataURL(file);
```
- dataResult
    - Promise

### arrayBuffer
```javascript
let bufferResult = promisedReader.arrayBuffer(file);
```
- bufferResult
    - Promise

### binaryString
```javascript
let binaryResult = promisedReader.binaryString(file);
```
- binaryResult
    - Promise
