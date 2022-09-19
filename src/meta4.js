class JSLib_Meta4 {
    constructor (array) {
        var header = '<?xml version="1.0" encoding="UTF-8"?><metalink xmlns="urn:ietf:params:xml:ns:metalink">';
        var footer = '</metalink>';
        var arraybuffer = [header];
        array.forEach(function (json) {
            var {name, size, version, language, hash, url, metaurl} = json;
            if (name) {
                var file = '<file name="' + name + '">';
            }
            else {
                file = '<file>';
            }
            if (size) {
                file += '<size>' + size + '</size>';
            }
            if (version) {
                file += '<version>' + version + '</version>';
            }
            if (language) {
                file += '<language>' + language + '</language>';
            }
            if (hash) {
                hash.forEach(function (json) {
                    var {type, hash} = json;
                    file += '<hash type="' + type + '">' + hash + '</hash>';
                });
            }
            url.forEach(function (json) {
                var {location, url} = json;
                if (location) {
                    var uri = '<url location="' + location + '">' + url + '</url>';
                }
                else {
                    uri = '<url>' + url+ '</url>';
                }
                file += uri;
            });
            if (metaurl) {
                metaurl.forEach(function (json) {
                    var {type, url} = json;
                    file += '<metaurl metatype="' + type + '">' + url + '</metaurl>';
                });
            }
            file += '</file>';
            arraybuffer.push(file);
        });
        arraybuffer.push(footer);
        this.arraybuffer = arraybuffer;
        this.text = arraybuffer.join('');
        this.blob = new Blob(arraybuffer, {type: 'application/metalink+xml; charset=utf-8'});
    }
    saveAs (name) {
        var anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(this.blob);
        anchor.download = name + '-' + new Date().toJSON().slice(0, -2).replace(/[T:\.\-]/g, '_') + '.meta4';
        anchor.click();
        anchor.remove();
    }
}
