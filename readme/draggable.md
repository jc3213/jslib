## How to implement
### HTML
```HTML
<script src="draggable.js"></script>
```
### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/src/draggable.js
```
## Syntax
```javascript
draggableElement(element, ondragend);
```
### element `*required`
A DOM **element**
### ondragend `Optional`
A callback function that is triggerd when drag'n'drop event ends
```javascript
function ondragend(position) {
    const {offsetTop, offsetLeft, availHeight, availWidth} = position;
}
```
#### offsetTop
Current `top` position of **element**
#### offsetLeft
Current `left` position of **element**
#### availHeight
Available `height` for drag'n'drop event. `offsetTop` can not exceed `availHeight`
#### availWidth
Available `width` for drag'n'drop event. `offsetLeft` can not exceed `availWidth`
