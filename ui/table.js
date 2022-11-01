class FlexTable {
    constructor () {
        this.table = document.createElement('div');
        this.table.className = 'jsui-table';
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
    set head (cells) {
        var column = document.createElement('div');
        column.className = 'jsui-table-head';
        cells.forEach(function (string) {
            var cell = document.createElement('div');
            cell.className = 'jsui-basic-cell';
            cell.innerText = string;
            column.appendChild(cell);
        });
        this.table.appendChild(column);
        this.cells = cells.length;
    }
    add (cells, events) {
        if (this.cells === undefined) {
            return this.head = cells;
        }
        if (this.cells !== cells.length) {
            throw new Error('Error: invalid table cell count ' + cells.length + ', current cell count is ' + this.cells);
        }
        var column = document.createElement('div');
        column.className = 'jsui-table-body';
        cells.forEach(function (string, index) {
            var cell = document.createElement('div');
            column.appendChild(cell);
            var event = events[index];
            if (typeof event === 'function') {
                cell.className = 'jsui-click-cell';
                cell.innerText = string;
                cell.addEventListener('click', event);
            }
            else {
                cell.className = 'jsui-basic-cell';
                cell.innerText = string;
            }
        });
        this.table.appendChild(column);
        return column;
    }
    set parentNode (element) {
        element.appendChild(this.table);
    }
}
