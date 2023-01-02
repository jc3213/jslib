class JSUI {
    constructor () {
        this.overlay = document.createElement('div');
        this.overlay.className = 'jsui-notify-overlay';
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        @media (prefers-color-scheme: light) {
            .jsui-menu-item {border-color: #fff;}
        }
        @media (prefers-color-scheme: dark) {
            .jsui-menu-item {border-color: #000;}
        }
        .jsui-menu-item {text-align: center; margin: 1px; padding: 3px; border-width: 1px; border-style: outset;}
        .jsui-menu-item:not(.jsui-menu-disabled):hover {cursor: pointer; filter: contrast(75%);}
        .jsui-menu-item:not(.jsui-menu-disabled):active {filter: contrast(45%);}
        .jsui-menu-item:active, .jsui-menu-checked {border-style: inset;}
        .jsui-menu-disabled {padding: 4px; border-width: 0px; filter: contrast(25%);}
        .jsui-basic-menu, .jsui-drop-menu {margin: 0px; padding: 0px; user-select: none;}
        .jsui-basic-menu {display: flex; gap: 1px;}
        .jsui-basic-menu > * {flex: 1;}
        .jsui-notify-overlay {position: fixed; top: 20px; left: 0px; z-index: 99999999;}
        .jsui-notify-popup {position: relative; background-color: #fff; cursor: pointer; padding: 5px 10px; margin: 5px; width: fit-content; border-radius: 3px; border: 1px ridge #cccccc;}`;
        document.body.prepend(this.overlay);
        document.head.appendChild(this.css);
    }
    menulist (object) {
        var {items, dropdown} = object;
        var {menuitem} = this;
        var menu = document.createElement('div');
        if (dropdown) {
            menu.className = 'jsui-drop-menu';
        }
        else {
            menu.className = 'jsui-basic-menu';
        }
        items.forEach(function (object) {
            var item = menuitem(object);
            menu.append(item);
        });
        return menu;
    }
    menuitem (object) {
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
    notification (object) {
        var {message, onclick, timeout} = object;
        var {clientWidth} = document.documentElement;
        var popup = document.createElement('div');
        popup.className = 'jsui-notify-popup';
        popup.innerText = message;
        popup.addEventListener('click', function (event) {
            popup.remove();
            if (typeof onclick === 'function') {
                onclick();
            }
        });
        if (timeout !== undefined) {
            setTimeout(function () {
                popup.remove();
            }, timeout);
        }
        this.overlay.appendChild(popup);
        popup.style.left = (clientWidth - popup.offsetWidth) / 2 + 'px';
        return popup;
    }
}
