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
```javascript
const dragdrop = new DragDrop(source);
```
### source
The DOM `element` ready for drag‘and’drop\
The **source** can be drag'and'dropped anywhere on the **Document**
```javascript
const dragdrop = new DragDrop(source, target);
```
### target
The **source** will be appended as child node of the **target**\
The **source** can only be dropped on **target**
### Method
#### dropover `*set`
```javascript
dragdrop.dropover = target;
````
It is only available if **target** is defined when creating new instance\
The **source** can be drag'and'dropped on multiple **target**s
### Event
#### ondragend
**Event** triggered when **source** is drag'and'dropped on the **Document**
```javascript
draggable.ondragend = function (position) {
    const {top, left, height, width} = position;
}
```
**Event** triggered when **source** is drag'and'dropped on the **Document**
```javascript
draggable.ondragend = function (event) {
    const target = event.target;
}
```
**Event** triggerd when **source** is drag'and'dropped on **target**
#### top
Fixed `top` position of **element**
#### left
Fixed `left` position of **element**
#### height
Available `height` for drag'n'drop event. `top` can not exceed `height`
#### width
Available `width` for drag'n'drop event. `left` can not exceed `width`
