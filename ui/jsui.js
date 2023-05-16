class JSUI {
    new (tag, params) {
        if (typeof tag === 'string') {
            var node = document.createElement(tag);
            if (typeof params !== 'object') {
                return node;
            }
        }
        else if (typeof tag === 'object') {
            node = document.createElement('div');
            params = tag;
        }
        else {
            throw new Error('Invalid parameters for HTML element');
        }
        var {id, html, text, classes, attrs, onclick, change, timeout} = params;
        if (id !== undefined) {
            node.id = id;
        }
        if (html !== undefined) {
            node.innerHTML = html;
        }
        else if (text !== undefined) {
            node.innerText = text;
        }
        if (typeof classes === 'string') {
            node.className = classes;
        }
        else if (Array.isArray(classes)) {
            node.classList.add(...classes);
        }
        if (Array.isArray(attrs)) {
            attrs.forEach(function (attr) {
                var {name, value} = attr;
                node.setAttribute(name, value);
            });
        }
        else if (typeof attrs === 'object') {
            var {name, value} = attrs;
            node.setAttribute(name, value);
        }
        if (typeof onclick === 'function') {
            node.addEventListener('click', onclick);
        }
        if (typeof onchange === 'function') {
            node.addEventListener('change', onchange);
        }
        if (!isNaN(timeout)) {
            node.timeout = setTimeout(function () {
                node.remove();
            }, timeout);
        }
        return node;
    }
}
