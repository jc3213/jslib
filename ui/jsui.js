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
}
