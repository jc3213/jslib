function draggableElement(element, ondragend) {
    var availHeight;
    var availWidth;
    var offsetTop;
    var offsetLeft;
    element.draggable = true;
    element.addEventListener('dragstart', function (event) {
        var {clientHeight, clientWidth} = document.documentElement;
        offsetTop = event.clientY;
        offsetLeft = event.clientX;
        availHeight = clientHeight - element.offsetHeight;
        availWidth = clientWidth - element.offsetWidth;
        if (availHeight < 0) {
            availHeight = 0;
        }
        if (availWidth < 0) {
            availWidth = 0;
        }
    });
    element.addEventListener('dragend', function (event) {
        offsetTop = element.offsetTop + event.clientY - offsetTop;
        offsetLeft = element.offsetLeft + event.clientX - offsetLeft;
        if (offsetTop < 0) {
            offsetTop = 0;
        }
        else if (offsetTop > availHeight) {
            offsetTop = availHeight;
        }
        if (offsetLeft < 0) {
            offsetLeft = 0;
        }
        else if (offsetLeft > availWidth) {
            offsetLeft = availWidth;
        }
        element.style.top = offsetTop + 'px';
        element.style.left = offsetLeft + 'px';
        if (typeof ondragend === 'function') {
            ondragend({offsetTop, offsetLeft, availHeight, availWidth});
        }
    });
}
