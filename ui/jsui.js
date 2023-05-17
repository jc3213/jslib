class JSUI {
    constructor () {
        var stylesheet = `
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
        .jsui-notify-popup {position: relative; background-color: #fff; cursor: pointer; padding: 5px 10px; margin: 5px; width: fit-content; border-radius: 3px; border: 1px outset #cccccc;}`;
        var css = document.getElementById('jsui-stylesheet') ?? this.new('style').attr('id', 'jsui-stylesheet');
        css.innerText = stylesheet;
        css.add = function (string) {
            css.innerText += string;
            return css;
        };
        css.remove = function (string) {
            css.innerText.replace(string, '');
            return css;
        };
        document.head.append(css);
        this.css = css;
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
                var keys = Object.keys(name);
                var length = keys.length;
                for (var i = 0; i < length; i ++) {
                    var key = keys[i];
                    var val = name[key];
                    node.setAttribute(key, val);
                }
            }
            else {
                node.setAttribute(name, value);
            }
            return node;
        };
        node.css = function (name, value) {
            if (typeof name === 'object') {
                var keys = Object.keys(name);
                var length = keys.length;
                for (var i = 0; i < length; i ++) {
                    var key = keys[i];
                    var val = name[key];
                    node.style[key] = val;
                }
            }
            else {
                node.style[name] = value;
            }
            return node;
        }
        node.class = function (string) {
            var names = string.match(/[^\s,]+/g);
            var length = names.length;
            for (var i = 0; i < length; i ++) {
                var name = names[i];
                node.classList.toggle(name);
            }
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
        }
        node.onclick = function (callback) {
            node.addEventListener('click', callback);
            return node;
        };
        node.onchange = function (callback) {
            node.addEventListener('change', callback);
            return node;
        };
        node.wait = function (number) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(node);
                }, number);
            });
        };
        return node;
    }
}
