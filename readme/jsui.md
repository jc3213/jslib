## Read More
[JSUI with CSS](jsui_css.md)

[JSUI Extended](jsui_ext.md)

## Usage

#### Download
[JSUI](https://jc3213.github.io/jslib/ui/jsui.js)

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
- [html](#html)
- [empty](#empty)
- [attr](#attr)
- [class](#class)
- [css](#css)
- [parent](#parent)
- [hide](#hide)
- [show](#show)
- [switch](#switch)
- [wait](#wait)
- [onclick](#onclick)
- [onchange](#onchange)

#### text
```javascript
node.text(string);
```

#### html
```javascript
node.html(string);
```

#### empty
```javascript
node.empty();
```

#### attr
```javascript
node.attr('name', 'value');
```
```javascript
node.attr({name1: 'value1', name2: 'value2'});
````
- **name**
    - The name of the attribute, [read more](https://developer.mozilla.org/docs/Web/HTML/Global_attributes)
- **value**
    - The value of the attribute

#### class
```javascript
node.class('some-class');
```
```javascript
node.class('this-class, that-class');
```

#### css
```javascript
node.css('width', '100px');
```
```javascript
node.css({width: '100px', height: '200px'});
```

#### parent
```javascript
node.parent(parentNode);
```

#### hide
```javascript
node.hide();
```

#### show
```javascript
node.show();
```

#### switch
```javascript
node.switch();
```

#### wait
```javascript
node.wait(number).then(dosomething);
```
```javascript
await node.wait(number);
dosomething();
```
- **number**
    - The time to wait, *millisecond*
- **dosomething**
    - Function callback
    - *node*

#### onclick
```javascript
node.onclick(dosomething);
```
- **dosomething**
    - Function callback
    - *event*

#### onchange
```javascript
node.onchange(dosomething);
```
- **dosomething**
    - Function callback
    - *event*
