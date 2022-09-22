## How to implement
### HTML
```HTML
<script src="draggable.js"></script>
```
### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/js/draggable.js
```
## Syntax
```javascript
const draggable = new DraggableElement(element, global);
```
### element `*required`
A DOM **element**
### global `Optional`
A **boolean** that defines whether the DOM element can be dragged over the whole document
## Event
```javascript
draggable.ondragdrop = function (position) {
    const {top, left, height, width} = position;
}
```
#### top
Current `top` position of **element**
#### left
Current `left` position of **element**
#### height
Available `height` for drag'n'drop event. `top` can not exceed `height`
#### width
Available `width` for drag'n'drop event. `left` can not exceed `width`
