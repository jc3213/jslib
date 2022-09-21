class JSUI_Table {
    constructor (title) {
        var column = document.createElement('div');
        column.className = 'jsui_table_head';
        title.forEach(function (string) {
            var cell = document.createElement('div');
            cell.className = 'jsui_table_cell';
            cell.innerText = string;
            column.appendChild(cell);
        });
        this.table = document.createElement('div');
        this.table.className = 'jsui_table';
        this.table.append(column);
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        .jsui_table {overflow-y: auto; border: 1px solid #000;}
        .jsui_table_head, .jsui_table > * {display: flex; gap: 1px;}
        .jsui_table_head > * {background-color: #000 !important; color: #fff; padding: 5px;}
        .jsui_table_cell, .jsui_cell_btn {padding: 5px; margin-top: 1px; background-color: #eee; text-align: center; flex: 1;}
        .jsui_cell_btn {cursor: pointer;}
        .jsui_cell_btn:hover {filter: contrast(80%);}
        .jsui_cell_btn:active {filter: contrast(40%);}`;
        document.head.appendChild(this.css);
    }
    clear () {
        [...this.table.childNodes].forEach(function (column, idx) {
            if (idx > 0) {
                column.remove();
            }
        });
    }
    add (cells) {
        var column = document.createElement('div');
        column.className = 'jsui_column';
        cells.forEach(function (object) {
            var cell = document.createElement('div');
            column.appendChild(cell);
            if (typeof object === 'string') {
                cell.className = 'jsui_table_cell';
                cell.innerText = object;
            }
            else {
                var {label, onclick} = object;
                cell.className = 'jsui_cell_btn';
                cell.innerText = label;
                cell.addEventListener('click', onclick);
            }
        });
        this.table.appendChild(column);
        return column;
    }
    set cssText (text) {
        this.css.innerText += text;
    }
    set parentNode (dom) {
        dom.append(this.table);
    }
}
