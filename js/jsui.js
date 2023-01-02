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
        .jsui-notify-popup {position: relative; background-color: #fff; cursor: pointer; padding: 5px 10px; margin: 5px; width: fit-content; border-radius: 3px; border: 1px outset #cccccc;}`;
        document.body.prepend(this.overlay);
        document.head.appendChild(this.css);
    }
    menulist (array, bool) {
        var {menuitem} = this;
        var menu = document.createElement('div');
        if (bool) {
            menu.className = 'jsui-drop-menu';
        }
        else {
            menu.className = 'jsui-basic-menu';
        }
        array.forEach(function (object) {
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
    dragndrop (source, target) {
        source.draggable = true;
        if (typeof target === 'function') {
            var ondragend = target;
            target = undefined;
        }
        if (target === undefined) {
            var top;
            var left;
            var height;
            var width;
            target = document;
            source.style.position = 'fixed';
            source.addEventListener('dragstart', function (event) {
                var {clientHeight, clientWidth} = document.documentElement;
                var {clientX, clientY, target} = event;
                var {offsetHeight, offsetWidth} = target;
                top = clientY;
                left = clientX;
                height = clientHeight - offsetHeight;
                width = clientWidth - offsetWidth;
                if (height < 0) {
                    height = 0;
                }
                if (width < 0) {
                    width = 0;
                }
            });
            document.addEventListener('dragover', function (event) {
                event.preventDefault();
            });
            document.addEventListener('drop', function (event) {
                var {clientX, clientY} = event;
                var {offsetTop, offsetLeft} = source;
                top = offsetTop + clientY - top;
                left = offsetLeft + clientX - left;
                if (top < 0) {
                    top = 0;
                }
                else if (top > height) {
                    top = height;
                }
                if (left < 0) {
                    left = 0;
                }
                else if (left > width) {
                    left = width;
                }
                source.style.top = top + 'px';
                source.style.left = left + 'px';
                if (typeof ondragend === 'function') {
                    ondragend({top, left, height, width});
                }
            });
        }
        else {
            if (!Array.isArray(target)) {
                target = [target];
            }
            target.forEach(function (element) {
                element.addEventListener('dragover', function (event) {
                    event.preventDefault();
                });
                element.addEventListener('drop', function (event) {
                    element.appendChild(source);
                });
            });
        }
    }
}
