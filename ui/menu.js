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
    menu (items, drop) {
        var menu = document.createElement('div');
        if (drop) {
            menu.className = 'jsui-drop-menu';
        }
        else {
            menu.className = 'jsui-basic-menu';
        }
        if (items) {
            var menuitem = this.item;
            items.forEach(function (object) {
                var {label, onclick} = object;
                var item = menuitem(label, onclick);
                menu.appendChild(item);
            });
        }
        return menu;
    }
    item (label, onclick) {
        var item = document.createElement('div');
        item.className = 'jsui-menu-item';
        item.innerText = label;
        item.addEventListener('click', onclick);
        return item;
    }
}
