document.querySelector('#download_btn').addEventListener('click', event => {
    event.preventDefault();
    var entry = prompt('Download Url');
    try {
        var json = JSON.parse(entry);
        if (!Array.isArray(json)) {
            json = [json];
        }
        json.forEach(({url, options}) => {
            aria2RPC.call('aria2.addUri', [[url], options]);
        });
    }
    catch(error) {
        var urls = entry.match(/(https?:\/\/|ftp:\/\/|magnet:\?)[^\s;\|]+/g);
        if (urls) {
            urls.forEach(url => {
                aria2RPC.call('aria2.addUri', [[url]]);
            });
        }
    }
});

document.querySelector('#options_btn').addEventListener('click', event => {
    event.preventDefault();
    localStorage.jsonrpc_uri = jsonrpc_uri = prompt('JSON-RPC URI', jsonrpc_uri) ?? jsonrpc_uri;
    localStorage.jsonrpc_token = jsonrpc_token = prompt('Secret Token', jsonrpc_token) ?? jsonrpc_token;
    localStorage.manager_interval = manager_interval = prompt('Refresh Interval', manager_interval) ?? manager_interval;
    clearInterval(aria2Alive);
    aria2Socket.close();
    aria2Initial()
});

NodeList.prototype.disposition = function (json) {
    var options = {};
    this.forEach(node => {
        var {name} = node;
        var value = json[name];
        if (!value) {
            return;
        }
        if (filesize[name]) {
            value = getFileSize(value);
        }
        node.value = options[name] = value;
    });
    return options;
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

var filesize = {
    'min-split-size': 1,
    'disk-cache': 1,
    'max-download-limit': 1,
    'max-overall-download-limit': 1,
    'max-upload-limit': 1,
    'max-overall-upload-limit': 1
};


var {
    jsonrpc_uri = 'http://localhost:6800/jsonrpc',
    jsonrpc_token = '',
    manager_interval = 10000
} = localStorage;

function aria2Initial() {
    aria2Store = {jsonrpc_uri, jsonrpc_token, manager_interval};
    aria2RPC = new Aria2(jsonrpc_uri, jsonrpc_token);
    aria2StartUp();
}

aria2Initial();
