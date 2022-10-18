## Usage

#### Download
[Latest](https://raw.githubusercontent.com/jc3213/jslib/main/js/filereader.js)

#### HTML
```HTML
<script src="filereader.js"></script>
```

#### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/js/filereader.js
```

## Syntax
```javascript
const reader = new PromiseFileReader();
```

## Method

### `text(file)`
```javascript
const result = reader.text(file);
```

#### file
Javascript `File` object

#### result
Promise object, which returns the contents of the file as a text `string` if fulfilled

### `dataURL(file)`
```javascript
const result = reader.dataURL(file);
```

#### file
Javascript `File` object

#### result
Promise object, which returns a `data:` URL representing the file's content if fulfilled

### `arrayBuffer(file)`
```javascript
const result = reader.arrayBuffer(file);
```

#### file
Javascript `File` object

#### result
Promise object, which returns an `ArrayBuffer` representing the file's content if fulfilled

### `binaryString(file)`
```javascript
const result = reader.binaryString(file);
```

#### file
Javascript `File` object

#### result
Promise object, which returns the raw binary `string` data of the file's content if fulfilled

### `json(file)`
```javascript
const result = reader.json(file);
```

#### file
Javascript `File` object

#### result
Promise object, which returns the contents of the file as a `JSON` object if fulfilled

### `base64(file)`
```javascript
const result = reader.base64(file);
```

#### file
Javascript `File` object

#### result
Promise object, which returns base64 encoded `string` of the file's content if fulfilled
