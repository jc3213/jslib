var filesize = [
    'min-split-size',
    'disk-cache',
    'max-download-limit',
    'max-overall-download-limit',
    'max-upload-limit',
    'max-overall-upload-limit'
];

NodeList.prototype.printOptions = function (json) {
    var options = {};
    this.forEach(node => {
        var {name} = node;
        var value = json[name] ?? null;
        if (filesize.includes(name)) {
            value = getFileSize(value);
        }
        node.value = options[name] = value;
    });
    return options;
}

function getFileSize(bytes) {
    if (isNaN(bytes)) {
        return '?? ';
    }
    else if (bytes < 1024) {
        return bytes;
    }
    else if (bytes < 1048576) {
        return (bytes / 10.24 | 0) / 100 + 'K';
    }
    else if (bytes < 1073741824) {
        return (bytes / 10485.76 | 0) / 100 + 'M';
    }
    else if (bytes < 1099511627776) {
        return (bytes / 10737418.24 | 0) / 100 + 'G';
    }
    else {
        return (bytes / 10995116277.76 | 0) / 100 + 'T';
    }
}

function getDownloadName(bittorrent, [{path, uris}]) {
    if (bittorrent && bittorrent.info) {
        return bittorrent.info.name;
    }
    else if (path) {
        return path.slice(path.lastIndexOf('/') + 1);
    }
    else if (uris[0]) {
        return uris[0].uri;
    }
    return '???';
}
