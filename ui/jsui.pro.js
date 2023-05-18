class JSUI {
    constructor () {
        this.css = document.getElementById('jsui-stylesheet') ?? this.stylesheet();
        this.overlay = document.querySelector('div.jsui-notify-overlay') ?? this.new().class('jsui-notify-overlay').parent(document.body);
    }
    new (tag) {
        var node = document.createElement(tag ?? 'div');
        node.text = function (string) {
            node.innerText = string;
            return node;
        };
        node.html = function (string) {
            node.innerHTML = string;
            return node;
        };
        node.empty = function () {
            node.innerHTML = '';
            return node;
        };
        node.attr = function (name, value) {
            if (typeof name === 'object') {
                Object.keys(name).forEach(function (key) {
                    var value = name[key]
                    node.setAttribute(key, value);
                });
            }
            else {
                node.setAttribute(name, value);
            }
            return node;
        };
        node.class = function (string) {
            string.match(/[^\s,]+/g).forEach(function (name) {
                node.classList.toggle(name);
            });
            return node;
        };
        node.css = function (name, value) {
            if (typeof name === 'object') {
                Object.keys(name).forEach(function (key) {
                    var value = name[key];
                    node.style[key] = value;
                });
            }
            else {
                node.style[name] = value;
            }
            return node;
        };
        node.parent = function (element) {
            element.append(node);
            return node;
        };
        node.hide = function () {
            node.style.display = 'none';
            return node;
        };
        node.show = function () {
            node.style.display = '';
            return node;
        };
        node.switch = function () {
            if (node.style.display === 'none') {
                node.style.display = '';
            }
            else {
                node.style.display = 'none';
            }
            return node;
        };
        node.wait = function (number) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(node);
                }, number);
            });
        };
        node.onclick = function (callback) {
            node.addEventListener('click', callback);
            return node;
        };
        node.onchange = function (callback) {
            node.addEventListener('change', callback);
            return node;
        };
        return node;
    }
    stylesheet () {
        var css = this.new('style').attr('id', 'jsui-stylesheet').parent(document.head).text(`
        .jsui-menu-item {text-align: center; margin: 1px; padding: 3px 5px; border-width: 1px; border-classes: outset;}
        .jsui-menu-item:not(.jsui-menu-disabled):hover, .jsui-menu-cell:hover {cursor: pointer; filter: contrast(75%);}
        .jsui-menu-item:not(.jsui-menu-disabled):active, .jsui-menu-cell:active {filter: contrast(45%);}
        .jsui-menu-item:active, .jsui-menu-checked {border-classes: inset;}
        .jsui-menu-disabled {padding: 4px 6px; border-width: 0px; filter: contrast(25%);}
        .jsui-basic-menu, .jsui-drop-menu {margin: 0px; padding: 0px; user-select: none;}
        .jsui-basic-menu {display: flex; gap: 1px;}
        .jsui-basic-menu > * {flex: 1;}
        .jsui-table {border-width: 1px; border-classes: solid;}
        .jsui-table > * {display: flex; gap: 1px; margin: 1px;}
        .jsui-table > * > * {flex: 1; padding: 3px 5px; text-align: center; line-height: 100%; border-width: 1px; border-classes: solid;}
        .jsui-table-title > * {background-color: #000000; color: #ffffff;}
        .jsui-notify-overlay {position: fixed; top: 20px; left: 0px; z-index: 99999999;}
        .jsui-notify-popup {position: relative; background-color: #fff; cursor: pointer; padding: 5px 10px; margin: 5px; width: fit-content; border-radius: 3px; border: 1px outset #cccccc;}`);
        css.add = function (string) {
            css.innerText += string;
            return css;
        };
        css.remove = function (string) {
            css.innerText.replace(string, '');
            return css;
        };
        return css;
    }
    menu (bool) {
        var self = this;
        if (bool) {
            var name = 'jsui-drop-menu';
        }
        else {
            name = 'jsui-basic-menu';
        }
        var menu = self.new().class(name);
        menu.add = function (string) {
            var item = self.new().class('jsui-menu-item');
            if (string.startsWith('<') && string.endsWith('>')) {
                item.html(string);
            }
            else {
                item.text(string);
            }
            menu.append(item);
            return item;
        };
        menu.remove = function (number) {
            var items = menu.childNodes;
            var item = items[number];
            item.remove();
            return menu;
        };
        return menu;
    }
    table (array) {
        var self = this;
        var table = self.new().class('jsui-table');
        var thead = self.new().class('jsui-table-title');
        array.forEach(function (text) {
            var cell = self.new().text(text);
            thead.append(cell);
        });
        table.add = function (array) {
            var column = self.new().class('jsui-table-column');
            array.forEach(function (entry) {
                var cell = self.new();
                if (typeof entry === 'object') {
                    var {text, onclick} = entry;
                    if (text.startsWith('<') && text.endsWith('>')) {
                        cell.html(text);
                    }
                    else {
                        cell.text(text);
                    }
                    if (onclick !== undefined) {
                        cell.class('jsui-menu-cell').onclick(onclick);
                    }
                }
                else if (entry.startsWith('<') && entry.endsWith('>')) {
                    cell.html(entry);
                }
                else {
                    cell.text(entry);
                }
                column.append(cell);
            });
            table.append(column);
            return column;
        };
        table.clear = function () {
            var title = thead.innerHTML;
            table.html(title);
        };
        table.append(thead);
        return table;
    }
    notification (string, number) {
        var {clientWidth} = document.documentElement;
        var popup = this.new().class('jsui-notify-popup').onclick(function (event) {
            popup.remove();
        });
        if (string.startsWith('<') && string.endsWith('>')) {
            popup.html(string);
        }
        else {
            popup.text(string);
        }
        if (!isNaN(number)) {
            popup.wait(number).then(function (popup) {
                popup.remove();
            });
        }
        this.overlay.append(popup);
        popup.css('left', (clientWidth - popup.offsetWidth) / 2 + 'px');
        return popup;
    }
}
