class JSUI {
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