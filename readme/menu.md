## How to Use
### HTML
```HTML
<script src="menu.js"></script>
```
### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/ui/menu.js
```
## Syntax
```javascript
const jsMenu = new FlexMenu();
```
## Method
```javascript
const menu = jsMenu.menu(array, dropdown);
```
### menu
The flexible menu contains sub menuitems
### array `required`
Array of [ {`label`, `onclick`}, {`label`, `onclick`} ]
### dropdown `*Optional`
Define whether the `menu` is a dropdown menu **boolean**
#### label
The text content of the menuitem
#### onclick
`Event` that when menuitem is clicked
```javascript
const menuitem = jsMenu.item(label, onclick);
```
### menuitem
The menuitem that can be appended to the DOM
#### label
The text content of the menuitem
#### onclick
`Event` that when menuitem is clicked
