class Metalink4 {
    constructor (...args) {
        var content = args.map(this.content);
        var array = ['<?xml version="1.0" encoding="UTF-8"?>', '<metalink xmlns="urn:ietf:params:xml:ns:metalink">', content, '</metalink>'];
        var text = () => array.join('\n');
        var blob = () => new Blob(array, {type: 'application/metalink+xml; charset=utf-8'});
        return {array, text, blob};
    }
    content ({name, size, version, language, hash, url, metaurl}) {
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
