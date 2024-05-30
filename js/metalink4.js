class Metalink {
    constructor (...args) {
        let encoder = new TextEncoder();
        let metalink = ['<?xml version="1.0" encoding="UTF-8"?>\n<metalink xmlns="urn:ietf:params:xml:ns:metalink">', ...args.map(this.meta4), '</metalink>'];
        this.text = metalink.join('\n');
        this.lines = this.text.split(/\n\s*/);
        this.arrayBuffer = encoder.encode(this.text);
        this.dataURL = 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent(this.text)));
        this.blob = new Blob([this.text], {type: 'application/metalink+xml; charset=utf-8'});
    }
    meta4 (arg) {
        let file = '    ';
        let {name, size, version, language, hash = [], url, metaurl = []} = arg;
        file += name ? '<file name="' + name + '">' : '<file>';
        if (size) {
            file += '\n        <size>' + size + '</size>';
        }
        if (version) {
            file += '\n        <version>' + version + '</version>';
        }
        if (language) {
            file += '\n        <language>' + language + '</language>';
        }
        let hashes = Array.isArray(hash) ? hash : [hash];
        hashes.forEach(({type, hash}) => file += '\n        <hash type="' + type + '">' + hash + '</hash>');
        let urls = Array.isArray(url) ? url : [url];
        urls.forEach((arg) => {
            if (typeof arg === 'object') {
                let {location, url} = arg;
                file += location ?  '\n        <location="' + location + '">' + url + '</url>' : '\n        <url>' + url + '</url>';
            } else if (typeof arg === 'string') {
                file += '\n        <url>' + arg + '</url>';
            }
        });
        let metaurls = Array.isArray(metaurl) ? metaurl : [metaurl];
        metaurls.forEach(({type, url}) => file += '\n        <metaurl metatype="' + type + '">' + url + '</metaurl>');
        return file + '\n    </file>';
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
