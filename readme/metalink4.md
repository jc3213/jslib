## Usage

#### Download
[Latest](https://raw.githubusercontent.com/jc3213/jslib/main/js/metalink4.js)

#### HTML
```HTML
<script src="metalink4.js"></script>
```

#### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/js/metalink4.js
```

## Syntax
```javascript
const meta4 = metalink4(array);
```

### meta4
The result of metalink file content as text `string`

### array
Array of object `[ object0, object1, ... ]`

#### object
Syntax { `url`, `name`, `size`, `version`, `language`, `hash`, `metaurl` }

#### url `*required`
Array of [ {`url`, `location`}, {`url`, `location`} ]\
**location** is optional

#### name `Optional`
The name of the file

#### size `Optional`
The size of the file **interger**

#### version `Optional`
The version of the file

#### language `Optional`
The language of the file

#### hash `Optional`
Array of [ {`type`, `hash`}, {`type`, `hash`} ]\
Both **type** and **hash** are required\

#### metaurl `Optional`
Array of [ {`type`, `url`}, {`type`, `url`} ]\
Both **type** and **url** are required\
