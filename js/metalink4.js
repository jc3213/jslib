class Metalink {
    constructor (...args) {
        let result = '';
        args.forEach((obj) => result += this.meta4(obj));
        this.text = '<?xml version="1.0" encoding="UTF-8"?>\n<metalink xmlns="urn:ietf:params:xml:ns:metalink">' + result + '\n</metalink>';
        this.arrayOfText = this.text.split(/\n\s+/);
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
        if (hashes) {
            hashes.forEach(({type, hash}) => file += lnsp + '<hash type="' + type + '">' + hash + '</hash>');
        }
        urls.forEach((url) => {
            if (typeof url === 'string') {
                file += lnsp + '<url>' + url + '</url>';
            }
            else if (typeof url === 'object') {
                file += url.location ?  lnsp + '<location="' + url.location + '">' + url.url + '</url>' : lnsp + '<url>' + url.url + '</url>';
            }
        });
        if (metaurls) {
            metaurls.forEach(({type, url}) => file += lnsp + '<metaurl metatype="' + type + '">' + url + '</metaurl>');
        }
        return '\n    ' + file + '\n    </file>';
    }
    save (filename) {
        let url = URL.createObjectURL(this.blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
}
