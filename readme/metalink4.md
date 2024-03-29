## Usage

### Download
[Latest](https://jc3213.github.io/jslib/js/metalink4.js)

### HTML
```HTML
<script src="metalink4.js"></script>
```

### TamperMonkey
```javascript
// @require https://jc3213.github.io/jslib/js/metalink4.js
```

## Syntax
```javascript
let meta4 = new Metalink4(obj1, ...[obj2, obj3]);
let array = meta4.array;
let text = meta4.text();
let blob = meta4.blob();
```
- array
    - `array`: array of text of metalink4 file
- text
    - `string`: text content of metalink4 file
- blob
    - `blob`: blob object of metalink4 file
- object
    - Syntax { `url`, `name`, `size`, `version`, `language`, `hash`, `metaurl` }
    - [url](#url-required)
    - [name](#name-optional)
    - [size](#size-optional)
    - [version](#version-optional)
    - [language](#language-optional)
    - [hash](#hash-optional)
    - [metaurl](#metaurl-optional)

### url *`required`*
- The download url(s) of the file
- `string`
- `object`: {*url*, *location*}
  - `url`: *required*
  - `location`: *optional*
- `array`: [*obj1*, *obj2*, *obj3*, ...]

### name *`optional`*
- The name of the file
- `string`

### size *`optional`*
- The size of the file
- `integer`

### version *`optional`*
- The version of the file
- `string`

### language *`optional`*
- The language of the file
- `string`

### hash *`optional`*
- The hash(es) of the file
- `object`: {*type*, *hash*}
  - `type`: *required*
  - `hash`: *required*
- `array`: [obj1, obj2, obj3}]

### metaurl *`optional`*
- The metalink(s) of the file
- `object`: {*type*, *url*}
  - `type`: *required*
  - `url`: *required*
- `array`: [*obj1*, *obj2*, *obj3*, ...]
