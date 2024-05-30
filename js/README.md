## Usage

### Download
[Latest](https://jc3213.github.io/metalink.js/metalink.js)

### HTML
```HTML
<script src="https://jc3213.github.io/metalink.js/metalink.js"></script>
```

### TamperMonkey
```javascript
// @require https://jc3213.github.io/metalink.js/metalink.js
```

## Syntax
```javascript
let file1 = {url: {url: 'https://jc3213.github.io/metalink.js/metalink.js', location: 'en'}, version: '0.1.0'};
let file2 = {url: 'https://github.com/jc3213/metalink.js/archive/refs/heads/main.zip', name: 'metalink.js_by_@jc3213.zip'}
let metalink = new Metalink(file1, file2);
```

### Object
| Key       | Description | Details |
|-----------|-------------|:------------:|
| `url`    | file urls   | **required** <br> `String` or `Object` or `Array` |
| `name`    | file name   | *optional* |
| `size`    | file size   | *optional* |
| `version` | file version | *optional* |
| `language`| language    | *optional* |
| `hash`  | file hashes | *optional* <br> `Object` or `Array` |
| `metaurl`| the metaurls | *optional* <br> `Object` or `Array` |

## Method
- [save](#save)

### save
```javascript
metalink.save(filename);
```
- filename
    - `String`
    - The file name you'd like to save
    - Default `metalink_yymmdd_hhmmss`
