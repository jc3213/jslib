class JSUImax extends JSUI {
    constructor () {
        super();
        this.overlay = document.querySelector('div.jsui-notify-overlay') ?? this.new().class('jsui-notify-overlay');
        document.body.append(this.overlay);
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
        var length = array.length;
        for (var i = 0; i < length; i ++) {
            var cell = self.new().text(array[i]);
            thead.append(cell);
        }
        table.add = function (array) {
            var column = self.new().class('jsui-table-column');
            var length = array.length;
            for (var i = 0; i < length; i ++) {
                var el = array[i];
                if (typeof el === 'object') {
                    var {text, onclick} = el;
                    var cell = self.new();
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
                else {
                    cell = self.new().text(el);
                }
                column.append(cell);
            }
            table.append(column);
            return column;
        };
        table.clear = function () {
            var backup = thead.innerHTML;
            table.html(backup);
        };
        table.append(thead);
        return table;
    }
    notification (string) {
        var {clientWidth} = document.documentElement;
        var popup = this.new().class('jsui-notify-popup').text(string).onclick(event => popup.remove());
        this.overlay.append(popup);
        popup.css('left', (clientWidth - popup.offsetWidth) / 2 + 'px');
        return popup;
    }
    dragndrop (source, target) {
        // not fixed yet
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
