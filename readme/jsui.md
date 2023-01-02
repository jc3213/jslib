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

# Method
- [menulist](#menulist)
- [menuitem](#menuitem)
- [notification](#notification)

## menulist
```javascript
const menu = jsUI.menulist(object);
```

### menu
The generated flexiable menulist with menuitems

### object
Sytax {`items`, `dropdown`}

### items `required`
Array of [menuitem](#menuitem-required)

### dropdown `*Optional` **boolean**
Define whether the `menu` is a dropdown menu

## menuitem
```javascript
const item = jsUI.menuitem(menuitem);
```

### item
The generated menuitem

### menuitem `*required`
Javascript object that contains `text`, `attributes`, and `onclick` properties

#### text
The text on the button

#### attributes
Array of The DOM attributes [ {`name`, `value`}, {`name`, `value`} ] [Read More](https://developer.mozilla.org/docs/Web/HTML/Global_attributes)

#### onclick
`Event` function that will be triggered when menuitem is clicked

## notification
```javascript
const popup = jsUI.notification(notify);
```

### popup
A pop up notification element

### notify
Javascript object that contains `message`, `timeout`, and `onclick` properties

#### message
`String` of message that will to be shown in `popup`

#### onclick
`Event` function that will be triggered when `popup` is clicked

#### timeout
`Time` elaspe that the `popup` will be shown **milliseconds**

