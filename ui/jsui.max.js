class JSUI {
    constructor () {
        this.css = document.getElementById('jsui-stylesheet') ?? this.stylesheet();
    }
    stylesheet () {
        var css = this.new('style').attr('id', 'jsui-stylesheet').parent(document.head).body(`
        .jsui-menu-item {text-align: center; margin: 1px; padding: 3px 5px; border-width: 1px; border-style: outset;}
        .jsui-menu-item:not(.jsui-menu-disabled):hover, .jsui-menu-cell:hover {cursor: pointer; filter: contrast(75%);}
        .jsui-menu-item:not(.jsui-menu-disabled):active, .jsui-menu-cell:active {filter: contrast(45%);}
        .jsui-menu-item:active, .jsui-menu-checked {border-style: inset;}
        .jsui-menu-disabled {padding: 4px 6px; border-width: 0px; filter: contrast(25%);}
        .jsui-basic-menu, .jsui-drop-menu {margin: 0px; padding: 0px; user-select: none;}
        .jsui-basic-menu {display: flex; gap: 1px;}
        .jsui-basic-menu > * {flex: 1;}
        .jsui-table {border-width: 1px; border-style: solid;}
        .jsui-table > * {display: flex; gap: 1px; margin: 1px;}
        .jsui-table > * > * {flex: 1; padding: 3px 5px; text-align: center; line-height: 100%; border-width: 1px; border-style: solid;}
        .jsui-table-title > * {background-color: #000000; color: #ffffff;}
        .jsui-notify-overlay {position: fixed; top: 20px; left: 0px; z-index: 99999999;}
        .jsui-notify-popup {position: relative; background-color: #fff; cursor: pointer; padding: 5px 10px; margin: 5px; width: fit-content; border-radius: 3px; border: 1px outset #cccccc;}`);
        css.add = (string) => {
            css.innerText += string;
            return css;
        };
        css.purge = (string) => {
            css.innerText.replace(string, '');
            return css;
        };
        return css;
    }
    new (string) {
        var node = document.createElement(string ?? 'div');
        node.body = (string) => {
            if (string) {
                node.innerHTML = string;
            }
            else {
                node.innerHTML = '';
            }
            return node;
        };
        node.attr = (name, value) => {
            if (typeof name === 'object') {
                Object.keys(name).forEach((key) => node.setAttribute(key, name[key]));
            }
            else {
                node.setAttribute(name, value);
            }
            return node;
        };
        node.class = (...args) => {
            if (args.length === 0) {
                node.className = '';
            }
            else {
                args.forEach((arg) => node.classList.toggle(arg));
            }
            return node;
        };
        node.css = (name, value) => {
            if (typeof name === 'object') {
                Object.keys(name).forEach((key) => node.style[key] = name[key]);
            }
            else {
                node.style[name] = value;
            }
            return node;
        };
        node.parent = (element) => {
            element.append(node);
            return node;
        };
        node.hide = () => {
            node.style.display = 'none';
            return node;
        };
        node.show = () => {
            node.style.display = '';
            return node;
        };
        node.switch = () => {
            node.style.display = node.style.display === 'none' ? '' : 'none';
            return node;
        };
        node.wait = (number) => {
            return new Promise((resolve) => {
                setTimeout(() => resolve(node), number);
            });
        };
        node.onclick = (callback) => {
            node.addEventListener('click', callback);
            return node;
        };
        node.onchange = (callback) => {
            node.addEventListener('change', callback);
            return node;
        };
        return node;
    }
    menu (bool) {
        var menu = this.new().class(bool ? 'jsui-drop-menu' : 'jsui-basic-menu');
        menu.add = (string) => {
            var item = this.new().class('jsui-menu-item').body(string).parent(menu);
            return item;
        };
        menu.purge = (number) => {
            menu.childNodes[number].remove();
            return menu;
        };
        return menu;
    }
    table (array) {
        var table = this.new().class('jsui-table');
        var thead = this.new().class('jsui-table-title');
        array.forEach((text) => this.new().body(text).parent(thead));
        table.add = (array) => {
            var column = this.new().class('jsui-table-column').parent(table);
            array.forEach((entry) => {
                var cell = this.new().parent(column);
                var type = typeof entry;
                if (typeof entry === 'object') {
                    var {text, onclick} = entry;
                    if (onclick !== undefined) {
                        cell.class('jsui-menu-cell').onclick(onclick);
                    }
                }
                else if (type === 'string') {
                    text = entry;
                }
                cell.body(text);
            });
            return column;
        };
        table.purge = (number) => {
            if (number > 0) {
                table.childNodes[number].remove();
            }
            return table;
        };
        table.empty = () => {
            table.body(thead.outerHTML);
            return table;
        };
        table.append(thead);
        return table;
    }
}
