class JSUI_Notify {
    constructor () {
        this.overlay = document.createElement('div');
        this.overlay.className = 'jsui_notify_overlay';
        document.body.appendChild(this.overlay);
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        .jsui_notify_overlay {position: absolute; z-index: 99999999; top: 20px; left: 0px;}
        .jsui_notify_popup {position: relative; background-color: #fff; cursor: pointer; padding: 5px 10px; margin: 5px; width: fit-content; border-radius: 3px; border: 1px outset #000;}`;
        document.head.appendChild(this.css);
    }
    popup (object) {
        var {message, onclick = () => void 0, timeout = 10000} = object;
        var popup = document.createElement('div');
        popup.className = 'jsui_notify_popup';
        popup.innerText = message;
        this.overlay.appendChild(popup);
        popup.style.left = ((document.body.offsetWidth - popup.offsetWidth) / 2) + 'px';
        popup.addEventListener('click', function (event) {
            popup.remove();
            onclick();
        });
        setTimeout(function () {
            popup.remove();
        }, timeout);
        return popup;
    }
    set cssText (text) {
        this.css.innerText += text;
    }
}
