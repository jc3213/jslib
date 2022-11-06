class FlexMenu {
    constructor () {
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        @media (prefers-color-scheme: light) { .jsui-menu-item {background-color: #f0f0f0; color: #000; border-color: #fff;} }
        @media (prefers-color-scheme: dark) { .jsui-menu-item {background-color: #3b3b3b; color: #fff; border-color: #000;} }
        .jsui-menu-item {text-align: center; margin: 1px; padding: 3px; border-width: 1px; border-style: outset;}
        .jsui-menu-item:not(.jsui-menu-disabled):hover {cursor: pointer; filter: contrast(65%);}
        .jsui-menu-item:not(.jsui-menu-disabled):active {filter: contrast(45%);}
        .jsui-menu-item:active, .jsui-menu-checked {border-style: inset;}
        .jsui-menu-disabled {padding: 4px; border-width: 0px;}
        .jsui-basic-menu, .jsui-drop-menu {margin: 0px; padding: 0px; user-select: none;}
        .jsui-basic-menu {display: flex; gap: 1px;}
        .jsui-basic-menu > * {flex: 1;}`;
        document.head.appendChild(this.css);
    }
    menu (object) {
        var {items, dropdown} = object;
        var menu = document.createElement('div');
        if (dropdown) {
            menu.className = 'jsui-drop-menu';
        }
        else {
            menu.className = 'jsui-basic-menu';
        }
        var menuitem = items.map(this.item);
        menu.append(...menuitem);
        return menu;
    }
    item (object) {
        var {text, attributes, onclick} = object;
        var item = document.createElement('div');
        item.className = 'jsui-menu-item';
        if (attributes) {
            attributes.forEach(function (object) {
                var {name, value} = object;
                item.setAttribute(name, value);
            });
        }
        item.innerText = text;
        item.addEventListener('click', onclick);
        return item;
    }
}
