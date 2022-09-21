class JSUI_Menu {
    constructor () {
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        .jsui_menu_btn {padding: 5px; margin: 1px; cursor: pointer; text-align: center;}
        .jsui_menu_btn:hover {filter: contrast(80%);}
        .jsui_menu_btn:active {filter: contrast(40%);}
        .jsui_basic_menu, .jsui_dropdown_menu {margin: 0px; padding: 0px; user-select: none;}
        .jsui_basic_menu {display: flex; gap: 1px;}
        .jsui_basic_menu > * {flex: 1;}`;
        document.head.appendChild(this.css);
    }
    menu (buttons, dropdown) {
        var menu = document.createElement('div');
        if (dropdown) {
            menu.className = 'jsui_dropdown_menu';
        }
        else {
            menu.className = 'jsui_basic_menu';
        }
        if (buttons) {
            var btnmk = this.button;
            buttons.forEach(function (object) {
                var {label, onclick} = object;
                var button = btnmk(label, onclick);
                menu.appendChild(button);
            });
        }
        return menu;
    }
    button (label, onclick) {
        var button = document.createElement('div');
        button.className = 'jsui_menu_btn';
        button.innerText = label;
        button.addEventListener('click', onclick);
        return button;
    }
    set cssText (text) {
        this.css.innerText += text;
    }
}
