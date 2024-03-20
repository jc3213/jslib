class Metalink {
    constructor (...args) {
        let result = '';
        let encoder = new TextEncoder();
        args.forEach((obj) => result += this.meta4(obj));
        this.text = '<?xml version="1.0" encoding="UTF-8"?>\n<metalink xmlns="urn:ietf:params:xml:ns:metalink">' + result + '\n</metalink>';
        this.lines = this.text.split(/\n\s*/);
        this.arrayBuffer = encoder.encode(this.text);
        this.dataURL = 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent(this.text)));
        this.blob = new Blob([this.text], {type: 'application/metalink+xml; charset=utf-8'});
    }
    meta4 ({name, size, version, language, hashes, urls, metaurls}) {
        let lnsp = '\n        ';
        let file = name ? '<file name="' + name + '">' : '<file>';
        if (size) {
            file += lnsp + '<size>' + size + '</size>';
        }
        if (version) {
            file += lnsp + '<version>' + version + '</version>';
        }
        if (language) {
            file += lnsp + '<language>' + language + '</language>';
        }
        hashes?.forEach(({type, hash}) => file += lnsp + '<hash type="' + type + '">' + hash + '</hash>');
        urls.forEach((url) => {
            if (typeof url === 'string') {
                file += lnsp + '<url>' + url + '</url>';
            }
            else if (typeof url === 'object') {
                file += url.location ?  lnsp + '<location="' + url.location + '">' + url.url + '</url>' : lnsp + '<url>' + url.url + '</url>';
            }
        });
        metaurls?.forEach(({type, url}) => file += lnsp + '<metaurl metatype="' + type + '">' + url + '</metaurl>');
        return '\n    ' + file + '\n    </file>';
    }
    save (filename) {
        if (!filename) {
            let date = new Date();
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let day = ('0' + date.getDate()).slice(-2);
            let hours = ('0' + date.getHours()).slice(-2);
            let minutes = ('0' + date.getMinutes()).slice(-2);
            let seconds = ('0' + date.getSeconds()).slice(-2);
            filename = 'metalink_' + year + month + day + '_' + hours + minutes + seconds;
        }
        let url = URL.createObjectURL(this.blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = filename + '.meta4';
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
}
