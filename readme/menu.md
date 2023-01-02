# JSUI Menus
- [Back](jsui.md)

# Method
- [menulist](#menulist)
- [menuitem](#menuitem)

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
Array of The DOM attributes [ {`name`, `value`}, {`name`, `value`} ] [Read More](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)

#### onclick
`Event` that when menuitem is clicked
