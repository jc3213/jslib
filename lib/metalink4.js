function metalink4(array) {
    var metalink = '<?xml version="1.0" encoding="UTF-8"?><metalink xmlns="urn:ietf:params:xml:ns:metalink">';
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
        metalink += file + '</file>';
    });
    metalink += '</metalink>';
    return metalink;
}
