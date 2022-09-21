## How to Use
### HTML
```HTML
<script src="metalink4.js"></script>
```
### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/js/metalink4.js
```
## Syntax
```javascript
const meta4 = metalink4(array);
```
### `array`
An array of object `[ object0, object1, ... ]`
#### `object`
Syntax `{ url, name, size, version, language, hash, metaurl }`
#### url `*required`
An Array of object `[ {url, location}, {url, location} ]`, **location** is optional
#### name `Optional`
The name of the file
#### size `Optional`
The size of the file `*interger`
#### version `Optional`
The version of the file
#### language `Optional`
The language of the file
#### hash `Optional`
An Array of object `[ {type, hash}, {type, hash} ]`, both **type** and **hash** are required. `<hash type="sha-256">40a51...1e1d7</hash>`
#### metaurl `Optional`
An Array of object `[ {type, url, {type, url} ]`, both **type** and **url** are required. `<metaurl type="torrent">http://sa.pl/e.torrent</metaurl>`
### meta4
The result of metalink file content as text `string`
