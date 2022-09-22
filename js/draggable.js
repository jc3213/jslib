class DraggableElement {
    constructor (element, global) {
        var draggable = this;
        element.draggable = true;
        element.addEventListener('dragstart', function (event) {
            draggable.ondragstart(event, draggable);
        });
        element.addEventListener('dragend', function (event) {
            draggable.ondragend(event, draggable);
        });
        if (global) {
            element.style.position = 'absolute';
            document.addEventListener('dragover', function (event) {
                event.preventDefault();
            });
        }
    }
    ondragstart (event, draggable) {
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
    ondragend (event, draggable) {
        var {clientX, clientY, target} = event;
        var {offsetTop, offsetLeft} = target;
        var {top, left, height, width} = draggable;
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
        target.style.top = top + 'px';
        target.style.left = left + 'px';
        if (typeof draggable.ondragdrop === 'function') {
            draggable.ondragdrop({top, left, height, width});
        }
    }
}
