class Metalink4 {
    text (object) {
        return this.content(object).join('');
    }
    blob (object) {
        return new Blob(this.content(object), {type: 'application/metalink+xml; charset=utf-8'});
    }
    content (object) {
        var files = Array.isArray(object) ? object.map(this.convert) : [this.convert(object)];
        return ['<?xml version="1.0" encoding="UTF-8"?>', '<metalink xmlns="urn:ietf:params:xml:ns:metalink">', ...files, '</metalink>'];
    }
    convert ({name, size, version, language, hash, url, metaurl}) {
        var file = name ? '<file name="' + name + '">' : '<file>';
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
            hash.forEach(({type, hash}) => {
                file += '<hash type="' + type + '">' + hash + '</hash>';
            });
        }
        if (typeof url === 'string') {
            url = [{url}];
        }
        else if (!Array.isArray(url)) {
            url = [url];
        }
        url.forEach(({location, url}) => {
            file += location ? '<url location="' + location + '">' + url + '</url>' : '<url>' + url+ '</url>';
        });
        if (metaurl) {
            metaurl.forEach(({type, url}) => {
                file += '<metaurl metatype="' + type + '">' + url + '</metaurl>';
            });
        }
        return file + '</file>';
    }
}
