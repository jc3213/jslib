class Notify {
    constructor () {
        this.overlay = document.createElement('div');
        this.overlay.className = 'jsui_notify_overlay';
        this.position = 'fixed';
        this.top = '20px';
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        .jsui_notify_overlay {left: 0px; z-index: 99999999;}
        .jsui_notify_popup {position: relative; background-color: #fff; cursor: pointer; padding: 5px 10px; margin: 5px; width: fit-content; border-radius: 3px; border: 1px outset #000;}`;
        document.body.prepend(this.overlay);
        document.head.appendChild(this.css);
    }
    popup (object) {
        var {message, onclick, timeout = 10000} = object;
        var popup = document.createElement('div');
        popup.className = 'jsui_notify_popup';
        popup.innerText = message;
        popup.addEventListener('click', function (event) {
            popup.remove();
            if (typeof onclick === 'function') {
                onclick();
            }
        });
        setTimeout(function () {
            popup.remove();
        }, timeout);
        this.overlay.appendChild(popup);
        popup.style.left = ((document.documentElement.clientWidth - popup.offsetWidth) / 2) + 'px';
        return popup;
    }
    set top (top) {
        this.overlay.style.top = top;
    }
    set position (position) {
        this.overlay.style.position = position;
    }
}
