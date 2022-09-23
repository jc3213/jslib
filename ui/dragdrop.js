class DragDrop {
    constructor (source, target) {
        this.source = source;
        source.draggable = true;
        if ([undefined, document, document.body].includes(target)) {
            this.draganddrop();
        }
        else {
            this.dragdrop = target;
        }
    }
    draganddrop () {
        var draggable = this;
        var {source} = this;
        source.style.position = 'fixed';
        source.addEventListener('dragstart', function (event) {
            draggable.ondragstart(draggable, event);
        });
        document.addEventListener('dragover', function (event) {
            event.preventDefault();
        });
        document.addEventListener('drop', function (event) {
            draggable.ondragend(draggable, event);
        });
    }
    set dragdrop (target) {
        var source = this.source;
        target.addEventListener('dragover', function (event) {
            event.preventDefault();
        });
        target.addEventListener('drop', function (event) {
            event.preventDefault();
            target.appendChild(source);
        });
    }
    ondragstart (draggable, event) {
        var {clientHeight, clientWidth} = document.documentElement;
        var {clientX, clientY, target} = event;
        var {offsetHeight, offsetWidth} = target;
        var height = clientHeight - offsetHeight;
        var width = clientWidth - offsetWidth;
        if (height < 0) {
            height = 0;
        }
        if (width < 0) {
            width = 0;
        }
        draggable.top = clientY;
        draggable.left = clientX;
        draggable.height = height;
        draggable.width = width;
    }
    ondragend (draggable, event) {
        var {clientX, clientY} = event;
        var {top, left, height, width, source} = draggable;
        var {offsetTop, offsetLeft} = source;
        top = offsetTop + clientY - top;
        left = offsetLeft + clientX - left;
        if (top < 0) {
            top = 0;
        }
        else if (top > height) {
            top = height;
        }
        if (left < 0) {
            left = 0;
        }
        else if (left > width) {
            left = width;
        }
        draggable.top = top;
        draggable.left = left;
        source.style.top = top + 'px';
        source.style.left = left + 'px';
        if (typeof draggable.ondragdrop === 'function') {
            draggable.ondragdrop({top, left, height, width});
        }
    }
}
