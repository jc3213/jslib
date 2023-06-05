class NodeObserver {
    timeout (selector, {anchorNode = document, timeout = 5} = {}) {
        return new Promise((resolve, reject) => {
            var observer = setInterval(() => {
                var element = anchorNode.querySelector(selector);
                if (element) {
                    clearInterval(observer);
                    resolve(element);
                }
                if ((timeout -= 0.25) === 0) {
                    clearInterval(observer);
                    reject(new TypeError(`Unable to find element with selector "${selector}"`));
                }
            }, 250);
        });
    }
    mutation (anchorNode, callback, options = {}) {
        options.tagName = options.tagName?.toUpperCase() ?? 'DIV';
        var match = Object.keys(options);
        var observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((newNode) => {
                    if (match.every(attr => options[attr] === newNode[attr])) {
                        callback(newNode);
                    }
                });
            });
        });
        observer.observe(anchorNode, {childList: true, subtree: true});
        return observer;
    }
}
