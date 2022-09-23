## How to implement
### HTML
```HTML
<script src="dragdrop.js"></script>
```
### TamperMonkey
```javascript
// @require https://raw.githubusercontent.com/jc3213/jslib/main/ui/dragdrop.js
```
## Syntax
### Over Document
```javascript
const dragdrop = new DragDrop(source);
draggable.ondragend = function (position) {
    const {top, left, height, width} = position;
}
```
### source
The DOM **element** to be dragged and dropped
### ondragend
An **Event** that triggers when the **srouce** is dropped
#### top
Fixed `top` position of **element**
#### left
Fixed `left` position of **element**
#### height
Available `height` for drag'n'drop event. `top` can not exceed `height`
#### width
Available `width` for drag'n'drop event. `left` can not exceed `width`
### Over Target Element
```javascript
const dragdrop = new DragDrop(source, target);
const dragdrop.dropover = target;
```
### target
The **target** element where **source** is dragged over and dropped on
The **source** will be appended as childnode of the **target**
## Event
### ondragend
An **Event** that triggers when the **srouce** is dropped
