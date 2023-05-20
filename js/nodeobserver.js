class NodeObserver {
    timeout (selector, options = {}) {
        var {anchorNode = document, timeout = 5} = options;
        return new Promise(function (resolve, reject) {
            var observer = setInterval(function () {
                var element = anchorNode.querySelector(selector);
                if (element) {
                    clearInterval(observer);
                    resolve(element);
                }
                timeout -= 0.25;
                if (timeout === 0) {
                    clearInterval(observer);
                    reject(new Error('Can\'t find element with DOM Selector "' + selector + '"'));
                }
            }, 250);
        });
    }
    mutation (anchorNode, options, callback) {
        if (typeof options === 'object') {
            tagName = options.tagName ?? 'DIV';
            options.tagName = tagName.toUpperCase();
        }
        else {
            var tagName = options ?? 'DIV';
            tagName = tagName.toUpperCase();
            options = {tagName};
        }
        var match = Object.keys(options);
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (newNode) {
                    var result = match.every(attr => options[attr] === newNode[attr]);
                    if (result) {
                        callback(newNode);
                    }
                });
            });
        });
        observer.observe(anchorNode, {childList: true, subtree: true});
        return observer;
    }
}
