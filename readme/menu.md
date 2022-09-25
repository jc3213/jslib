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
const menu = jsMenu.menu(object);
```
### menu
The generated flexible menu with flexible menu items
### object
Sytax {`items`, `dropdown`}
### items `required`
Array of [menuitem](#menuitem)
### dropdown `*Optional` **boolean**
Define whether the `menu` is a dropdown menu
```javascript
const menu = jsMenu.item(menuitem);
```
### menu
The generated flexible menu item
### menuitem `*required`
Javascript object that contains `text`, `attributes`, and `onclick` properties
#### text
The text on the button
#### attributes
Array of The DOM attributes [ {`name`, `value`}, {`name`, `value`} ] [Read More](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)
#### onclick
`Event` that when menuitem is clicked
