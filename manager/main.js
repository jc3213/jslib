var optnbtn = document.querySelector('#options_btn');
var setting = document.querySelector('#setting');
var adduri = document.querySelector('#adduri');
var entry = adduri.querySelector('#entry');
var enterbtn = adduri.querySelector('#enter_btn');
var firstRun = true;
var aria2Alive;
var aria2Socket;

document.addEventListener('click', (event) => {
    var {target} = event;
    if (optnbtn !== target && !setting.contains(target)) {
        container.classList.remove('options');
    }
});

downloadbtn.addEventListener('click', async (event) => {
    container.classList.toggle('adduri');
});

optionsbtn.addEventListener('click', (event) => {
    container.classList.toggle('options');
});

entry.addEventListener('change', event => {
    try {
        entry.json = JSON.parse(entry.value);
        entry.url = null;
    }
    catch (error) {
        entry.json = null;
        entry.url = entry.value.match(/(https?:\/\/|ftp:\/\/|magnet:\?)[^\s\n]+/g);
    }
});

adduri.querySelector('#proxy_btn').addEventListener('click', (event) => {
    event.target.previousElementSibling.value = localStorage.proxy_server;
});

enterbtn.addEventListener('click', async event => {
    var {json, url, options = {}} = entry;
    if (json) {
        await aria2RPC.addJSON(json, options);
    }
    else if (url) {
        await aria2RPC.addURI(url, options);
    }
    container.classList.remove('adduri');
});

setting.querySelectorAll('input').forEach((input) => input.value = localStorage[input.id]);
setting.addEventListener('change', (event) => {
    var {id, value} = event.target;
    localStorage[id] = aria2Store[id] = value;
    if (id !== 'proxy_server') {
        aria2Initial();
    }
});

NodeList.prototype.disposition = function (json) {
    var options = {};
    this.forEach(node => {
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

async function aria2Initial() {    
    clearInterval(aria2Alive);
    aria2Socket?.close();
    aria2RPC = new Aria2(aria2Store['jsonrpc_uri'], aria2Store['jsonrpc_token']);
    aria2StartUp();
    var [options, version] = await aria2RPC.batch([
        {method: 'aria2.getGlobalOption'},
        {method: 'aria2.getVersion'}
    ]);
    entry.options = adduri.querySelectorAll('input, textarea').disposition(options);
    document.querySelector('#aria2_ver').innerText = version.version;
}

aria2Initial();
