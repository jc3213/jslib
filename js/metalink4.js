class Metalink4 {
    text (object) {
        return this.content(object).join('');
    }
    blob (object) {
        return new Blob(this.content(object), {type: 'application/metalink+xml; charset=utf-8'});
    }
    content (object) {
        return [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<metalink xmlns="urn:ietf:params:xml:ns:metalink">',
            ...(Array.isArray(object) ? object : [object]).map(this.convert),
            '</metalink>'
        ];
    }
    convert ({name, size, version, language, hash, url, metaurl}) {
        var file = name ? `<file name="${name}">` : `<file>`;
        if (size) {
            file += `<size>${size}</size>`;
        }
        if (version) {
            file += `<version>${version}</version>`;
        }
        if (language) {
            file += `<language>${language}</language>`;
        }
        if (hash) {
            (Array.isArray(hash) ? hash : [hash]).forEach(({type, hash}) => {
                file += `<hash type="${type}">${hash}</hash>`;
            });
        }
        (typeof url === 'string' ? [{url}] : Array.isArray(url) ? url : [url]).forEach(({url, location}) => {
            file += location ? `<url location="${location}">${url}</url>` : `<url>${url}</url>`;
        });
        if (metaurl) {
            (Array.isArray(metaurl) ? metaurl : [metaurl]).forEach(({type, url}) => {
                file += `<metaurl metatype="${type}">${url}</metaurl>`;
            });
        }
        return file + `</file>`;
    }
}
