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
const draggable = new DraggableElement(source, target);
```
### source `*required`
A DOM **element**
### target `Optional`
The **target** element that the **source** element will be dragged over and dropped on.\
If **target** is not defined, the **source** will be dropped on the `Document` element
## Event
### ondragdrop
An **Event** that triggers when the **srouce** is dropped
```javascript
draggable.ondragdrop = function (position) {
    const {top, left, height, width} = position;
}
```
#### top
Fixed `top` position of **element**
#### left
Fixed `left` position of **element**
#### height
Available `height` for drag'n'drop event. `top` can not exceed `height`
#### width
Available `width` for drag'n'drop event. `left` can not exceed `width`
