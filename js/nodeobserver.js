function newNodeTimeoutObserver(selector, seconds) {
    return new Promise((resolve, reject) => {
        var timeout = (seconds ?? 5) * 4;
        var time = 0;
        var observer = setInterval(() => {
            var element = document.querySelector(selector);
            if (element) {
                clearInterval(observer);
                resolve(element);
            }
            time ++;
            if (time === timeout) {
                clearInterval(observer);
                reject(new Error('Can\'t find element with DOM Selector "' + selector + '"'));
            }
        }, 250);
    });
}
