class JSUI_Menu {
    constructor () {
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        .jsui_menu_item {padding: 5px; margin: 1px; cursor: pointer; text-align: center;}
        .jsui_menu_item:hover {filter: contrast(80%);}
        .jsui_menu_item:active {filter: contrast(40%);}
        .jsui_basic_menu, .jsui_dropdown_menu {margin: 0px; padding: 0px; user-select: none;}
        .jsui_basic_menu {display: flex; gap: 1px;}
        .jsui_basic_menu > * {flex: 1;}`;
        document.head.appendChild(this.css);
    }
    menu (items, dropdown) {
        var menu = document.createElement('div');
        if (dropdown) {
            menu.className = 'jsui_dropdown_menu';
        }
        else {
            menu.className = 'jsui_basic_menu';
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
        item.className = 'jsui_menu_item';
        item.innerText = label;
        item.addEventListener('click', onclick);
        return item;
    }
    set cssText (text) {
        this.css.innerText += text;
    }
}
