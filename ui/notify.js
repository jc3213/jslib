class SimpleNotify {
    constructor () {
        this.overlay = document.createElement('div');
        this.overlay.className = 'jsui-notify-overlay';
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        .jsui-notify-overlay {position: fixed; top: 20px; left: 0px; z-index: 99999999;}
        .jsui-notify-popup {position: relative; background-color: #fff; cursor: pointer; padding: 5px 10px; margin: 5px; width: fit-content; border-radius: 3px; border: 1px outset #000;}`;
        document.body.prepend(this.overlay);
        document.head.appendChild(this.css);
    }
    popup (object) {
        var {message, onclick, timeout} = object;
        var {clientWidth} = document.documentElement;
        var popup = document.createElement('div');
        popup.className = 'jsui-notify-popup';
        popup.innerText = message;
        popup.addEventListener('click', function (event) {
            popup.remove();
            if (typeof onclick === 'function') {
                onclick();
            }
        });
        if (timeout !== undefined) {
            setTimeout(function () {
                popup.remove();
            }, timeout);
        }
        this.overlay.appendChild(popup);
        popup.style.left = (clientWidth - popup.offsetWidth) / 0.02 / clientWidth + '%';
        return popup;
    }
}
