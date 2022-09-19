## How to Use
### HTML
```HTML
<script src="meta4.js"></script>
```
### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/libjs/main/src/meta4.js
```
## Syntax
```javascript
const metalink = new JSLib_Meta4(input);
```
### `input`
An array of object `[ object0, object1, ... ]`
#### `object`
Syntax `{ url, name, size, version, language, hash, metaurl }`
#### url `*required`
An Array of object `[ {url, location}, {url, location} ]`, **location** is optional
#### name `Optional`
The name of the file `<file name="This.File">`
#### size `Optional`
The size of the file `<size>4279183</size>`
#### version `Optional`
The version of the file `<version>1.0.1</version>`
#### language `Optional`
The language of the file `<laguage>en</language>`
#### hash `Optional`
An Array of object `[ {type, hash}, {type, hash} ]`, both **type** and **hash** are required. `<hash type="sha-256">40a51...1e1d7</hash>`
#### metaurl `Optional`
An Array of object `[ {type, url, {type, url} ]`, both **type** and **url** are required. `<metaurl type="torrent">http://sa.pl/e.torrent</metaurl>`
### metalink
An object `{arraybyte, text, blob}`
#### `arraybyte`
An array of metalink file content
#### `text`
a text string of metalink file content
#### `blob`
A blob object of metalink file
## Method
```javascript
metalink.saveAs(filename);
```
Save the result into a local file. If `filename` is not defined, default filename is **metalink**
