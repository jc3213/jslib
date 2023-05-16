## Usage

#### Download
[Latest](https://jc3213.github.io/jslib/ui/jsui.js)

#### HTML
```HTML
<script src="https://jc3213.github.io/jslib/ui/jsui.js"></script>
```

#### TamperMonkey
```javascript
// @require https://jc3213.github.io/jslib/ui/jsui.js
```

## Syntax
```javascript
const jsUI = new JSUI();
```

## Method
- [new](#new)

#### new
```javascript
const node = jsUI.new(tag);
```
- **node**
    - The generated HTML element node
- **tag**
    - *Default*: `div`
    - [HTML tag names](https://www.w3schools.com/TAGs/)

## Prototype
- [text](#text)

#### text
```javascript
node.text(string);
```

#### html
```javascript
node.html(string);
```

#### attr
```javascript
node.attr('name', 'value');
node.attr({name1: 'value1', name2: 'value2'})
````

- **name**
    - The attribute name, [read more](https://developer.mozilla.org/docs/Web/HTML/Global_attributes)
- **value**
    - The value of the attribute
