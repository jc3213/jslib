class FlexTable {
    constructor (title) {
        var column = document.createElement('div');
        column.className = 'jsui-table-head';
        title.forEach(function (string) {
            var cell = document.createElement('div');
            cell.className = 'jsui-basic-cell';
            cell.innerText = string;
            column.appendChild(cell);
        });
        this.table = document.createElement('div');
        this.table.className = 'jsui-table';
        this.table.appendChild(column);
        this.head = column;
        this.css = document.createElement('style');
        this.css.type = 'text/css';
        this.css.innerText = `
        .jsui-table {overflow-y: auto; border: 1px solid #000;}
        .jsui-table-head, .jsui-table > * {display: flex; gap: 1px;}
        .jsui-table-head > * {background-color: #000 !important; color: #fff; padding: 5px;}
        .jsui-basic-cell, .jsui-click-cell {padding: 5px; margin-top: 1px; background-color: #eee; text-align: center; flex: 1;}
        .jsui-click-cell {cursor: pointer;}
        .jsui-click-cell:hover {filter: contrast(80%);}
        .jsui-click-cell:active {filter: contrast(40%);}`;
        document.head.appendChild(this.css);
    }
    clear () {
        this.table.innerHTML = this.head.outerHTML;
    }
    add (cells) {
        var column = document.createElement('div');
        column.className = 'jsui-table-body';
        cells.forEach(function (object) {
            var cell = document.createElement('div');
            column.appendChild(cell);
            if (typeof object === 'string') {
                cell.className = 'jsui-basic-cell';
                cell.innerText = object;
            }
            else {
                var {label, onclick} = object;
                cell.className = 'jsui-click-cell';
                cell.innerText = label;
                cell.addEventListener('click', onclick);
            }
        });
        this.table.appendChild(column);
        return column;
    }
    set parentNode (element) {
        element.appendChild(this.table);
    }
}
