var optnbtn = document.querySelector('#options_btn');
var settings = document.querySelector('#settings');
var aria2Alive;
var aria2Socket;

document.addEventListener('click', (event) => {
    var {target} = event;
    if (optnbtn !== target && !settings.contains(target)) {
        document.body.classList.remove('options');
    }
});

document.querySelector('#options_btn').addEventListener('click', event => {
    document.body.classList.toggle('options');
});

settings.style.right = '0px';
settings.querySelectorAll('input').forEach(input => input.value = localStorage[input.id]);
settings.addEventListener('change', event => {
    var {id, value} = event.target;
    localStorage[id] = aria2Store[id] = value;
    if (id !== 'proxy_server') {
        aria2Initial();
    }
});

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

NodeList.prototype.disposition = function (json) {
    var options = {};
    this.forEach(node => {
        console.log(node);
        var {id} = node;
        var value = json[id];
        if (!value) {
            return;
        }
        if (filesize[id]) {
            value = getFileSize(value);
        }
        node.value = options[id] = value;
    });
    return options;
}

function getDownloadName(gid, bittorrent, [{path, uris}]) {
    return bittorrent?.info?.name || path?.slice(path.lastIndexOf('/') + 1) || uris[0]?.uri || gid;
}

function getFileSize(bytes) {
    if (isNaN(bytes)) {
        return '??';
    }
    else if (bytes < 1024) {
        return bytes;
    }
    else if (bytes < 1048576) {
        return `${(bytes / 10.24 | 0) / 100}K`;
    }
    else if (bytes < 1073741824) {
        return `${(bytes / 10485.76 | 0) / 100}M`;
    }
    else if (bytes < 1099511627776) {
        return `${(bytes / 10737418.24 | 0) / 100}G`;
    }
    else {
        return `${(bytes / 10995116277.76 | 0) / 100}T`;
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

var {jsonrpc_uri = 'http://localhost:6800/jsonrpc', jsonrpc_token = '', manager_interval = 10000} = localStorage;
aria2Store = {jsonrpc_uri, jsonrpc_token, manager_interval};

function aria2Initial() {    
    clearInterval(aria2Alive);
    if (aria2Socket) aria2Socket.close();
    aria2RPC = new Aria2(aria2Store['jsonrpc_uri'], aria2Store['jsonrpc_token']);
    aria2StartUp();
}

aria2Initial();
