class FlexMenu {
    constructor () {
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        .jsui-menu-item {padding: 5px; margin: 1px; cursor: pointer; text-align: center;}
        .jsui-menu-item:hover {filter: contrast(80%);}
        .jsui-menu-item:active {filter: contrast(40%);}
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
