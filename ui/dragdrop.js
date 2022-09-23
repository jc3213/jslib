class DragDrop {
    constructor (source, target) {
        this.source = source;
        source.draggable = true;
        if (target === undefined) {
            this.target = document;
            this.draddrop();
        }
        else {
            this.target = [];
            this.dropover = target;
        }
    }
    draddrop () {
        var self = this;
        var {source} = this;
        source.style.position = 'fixed';
        source.addEventListener('dragstart', function (event) {
            self.ondrag(self, event);
        });
        document.addEventListener('dragover', function (event) {
            event.preventDefault();
        });
        document.addEventListener('drop', function (event) {
            self.ondrop(self, event);
        });
    }
    set dropover (element) {
        var {source, target} = this;
        target.push(element);
        element.addEventListener('dragover', function (event) {
            event.preventDefault();
        });
        element.addEventListener('drop', function (event) {
            element.appendChild(source);
        });
    }
    ondrag (self, event) {
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
        self.top = clientY;
        self.left = clientX;
        self.height = height;
        self.width = width;
    }
    ondrop (self, event) {
        var {clientX, clientY} = event;
        var {top, left, height, width, source} = self;
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
        self.top = top;
        self.left = left;
        source.style.top = top + 'px';
        source.style.left = left + 'px';
        if (typeof self.ondragend === 'function') {
            self.ondragend({top, left, height, width});
        }
    }
}
