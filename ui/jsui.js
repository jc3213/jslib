class JSUI {
    constructor () {
        this.css = document.getElementById('jsui-stylesheet') ?? this.stylesheet();
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
}
