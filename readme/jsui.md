## Usage

#### Download
[Latest](https://raw.githubusercontent.com/jc3213/jslib/main/js/jsui.js)

#### HTML
```HTML
<script src="https://raw.githubusercontent.com/jc3213/jslib/main/js/jsui.js"></script>
```

#### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/js/jsui.js
```

## Syntax
```javascript
const jsUI = new JSUI();
```

## Method
- [menulist](#menulist)
- [menuitem](#menuitem)
- [notification](#notification)
- [table](#table)

## Prototype
- [parent](#parent)

#### parent
```javascript
node.parent(target);
```
- **node**
    - The HTML element node created by this script
- **target**
    - The target HTML element node where the **node** will be appended to

#### menulist
```javascript
const menu = jsUI.menulist(array, vertical);
```
- **menu**
    - The generated flexiable menulist with menuitems
- **array**
    - An `Array` of [Properties](properties)
- **vertical**
    - `Boolean`, decide whether the menulist shall be vertical or horizontal

#### menuitem
```javascript
const item = jsUI.menuitem(menuinfo);
```
- **item**
    - The generated menuitem
- **menuinfo** `*required`
    - Read [Properties](#properties)

## notification
```javascript
const popup = jsUI.notification(notify);
```
- **popup**
    - The notification element
- **notify**
    - Read [Properties](#properties)

## table
```javascript
const table = jsUI.table(array);
```
- **table**
    - The table element created
- **array**
    - An `Array` of text `String` for table head

#### add
```javascript
table.add(array);
````
- **array**
    - An `Array` of [properties](#properties) or text `String`

#### clear
````javascript
table.clear();
````

## Properties

#### Syntax
```javascript
const {id, text, html, attr, onclick, timeout} = properties
```
- **id**: The `id` of the element
- **attr**: Syntax {`name, value`}, or an array contains attr. [Read More](https://developer.mozilla.org/docs/Web/HTML/Global_attributes)
    - name: The name of the attribute
    - value: The value of the attribute
- **html**: The `innerHtml` content of the element [Not Compatible with **text**]
- **text**: The `innerText` content of the element [Not Compatible with **html**]
- **onclick**: The event that will be triggered if element is clicked
- **timeout**: The elaspe time that the element will be shown
