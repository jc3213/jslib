class JSUI {
    constructor () {
        this.overlay = document.createElement('div');
        this.overlay.className = 'jsui-notify-overlay';
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        @media (prefers-color-scheme: light) {
            .jsui-menu-item, .jsui-table, .jsui-table-cell {border-color: #ffffff;}
        }
        @media (prefers-color-scheme: dark) {
            .jsui-menu-item, .jsui-table, .jsui-table-cell {border-color: #000000;}
        }
        .jsui-menu-item {text-align: center; margin: 1px; padding: 3px; border-width: 1px; border-style: outset;}
        .jsui-menu-item:not(.jsui-menu-disabled):hover, .jsui-table-button:hover {cursor: pointer; filter: contrast(75%);}
        .jsui-menu-item:not(.jsui-menu-disabled):active, .jsui-table-button:active {filter: contrast(45%);}
        .jsui-menu-item:active, .jsui-menu-checked {border-style: inset;}
        .jsui-menu-disabled {padding: 4px; border-width: 0px; filter: contrast(25%);}
        .jsui-basic-menu, .jsui-drop-menu {margin: 0px; padding: 0px; user-select: none;}
        .jsui-basic-menu {display: flex; gap: 1px;}
        .jsui-basic-menu > * {flex: 1;}
        .jsui-table-head > * {background-color: #000000; color: #ffffff;}
        .jsui-table {border-width: 1px; border-style: solid;}
        .jsui-table-column {display: flex; gap: 1px; margin: 1px;}
        .jsui-table-cell, .jsui-table-button {flex: 1; padding: 5px; text-align: center; line-height: 100%; border-width: 1px; border-style: solid;}
        .jsui-notify-overlay {position: fixed; top: 20px; left: 0px; z-index: 99999999;}
        .jsui-notify-popup {position: relative; background-color: #fff; cursor: pointer; padding: 5px 10px; margin: 5px; width: fit-content; border-radius: 3px; border: 1px outset #cccccc;}`;
        document.body.prepend(this.overlay);
        document.head.appendChild(this.css);
    }
    menulist (array, bool) {
        var {add} = this;
        var menu;
        if (bool) {
            menu = add({style: 'jsui-drop-menu'});
        }
        else {
            menu = add({style: 'jsui-basic-menu'});;
        }
        array.forEach(function (object) {
            object.style = 'jsui-menu-item';
            var item = add(object);
            menu.appendChild(item);
        });
        return menu;
    }
    menuitem (object) {
        object.style = 'jsui-menu-item';
        var item = this.add(object);
        return item;
    }
    table (array) {
        var {add} = this;
        var table = add({style: 'jsui-table'});
        var head = add({style: 'jsui-table-head jsui-table-column'});
        var body = add({style: 'jsui-table-body'});
        array.forEach(function (text) {
            var cell = add({text, style: 'jsui-table-cell'});
            head.appendChild(cell);
        });
        table.add = function (array) {
            var column = add({style: 'jsui-table-column'});
            array.forEach(function (object) {
                if (typeof object === 'string') {
                    object = {
                        text: object,
                        style: 'jsui-table-cell'
                    };
                }
                else if (typeof object === 'object') {
                    if ('onclick' in object) {
                        object.style = 'jsui-table-button';
                    }
                    else {
                        object.style = 'jsui-table-cell';
                    }
                }
                var cell = add(object);
                column.appendChild(cell);
            });
            body.appendChild(column);
            return column;
        };
        table.clear = function () {
            body.innerHTML = '';
        };
        table.append(head, body);
        document.body.appendChild(table);
        return table;
    }
    notification (object) {
        var {clientWidth} = document.documentElement;
        var onclick = object.onclick;
        object.style = 'jsui-notify-popup';
        if (typeof onclick === 'function') {
            object.onclick = function () {
                onclick();
                popup.remove();
            };
        }
        else {
            object.onclick = function () {
                popup.remove();
            }
        }
        var popup = this.add(object);
        this.overlay.appendChild(popup);
        popup.style.left = (clientWidth - popup.offsetWidth) / 2 + 'px';
        return popup;
    }
    add (object) {
        var {id, text, html, style, attr, onclick, timeout} = object;
        var node = document.createElement('div');
        if (style !== undefined) {
            node.className = style;
        }
        if (id !== undefined) {
            node.id = id;
        }
        if (html !== undefined) {
            node.innerHTML = html;
        }
        else if (text !== undefined) {
            node.innerText = text;
        }
        if (attr !== undefined) {
            if (!Array.isArray(attr)) {
                attr = [attr];
            }
            attr.forEach(function (object) {
                var {name, value} = object;
                node[name] = value;
            });
        }
        if (onclick !== undefined) {
            node.addEventListener('click', onclick);
        }
        if (!isNaN(timeout)) {
            node.timeout = setTimeout(function () {
                node.remove();
            }, timeout);
        }
        node.parent = function (target) {
            target.appendChild(node);
        };
        return node;
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
