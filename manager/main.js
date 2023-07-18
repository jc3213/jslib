var downloadbtn = document.querySelector('#download_btn');
var optnbtn = document.querySelector('#options_btn');
var setting = document.querySelector('#setting');
var adduri = document.querySelector('#adduri');
var entry = adduri.querySelector('#entry');
var uploader = adduri.querySelector('#uploader');

document.addEventListener('click', ({target}) => {
    var {id} = target;
    if (id !== 'options_btn' && !setting.contains(target)) {
        manager.classList.remove('setting');
    }
    if (id !== 'download_btn' && !adduri.contains(target)) {
        manager.classList.remove('adduri');
    }
});

function managerDownload() {
    manager.classList.toggle('adduri');
}

function managerOptions() {
    manager.classList.toggle('setting');
}

entry.addEventListener('change', (event) => {
    try {
        entry.json = JSON.parse(entry.value);
        entry.url = null;
    }
    catch (error) {
        entry.json = null;
        entry.url = entry.value.match(/(https?:\/\/|ftp:\/\/|magnet:\?)[^\s\n]+/g);
    }
});

adduri.addEventListener('click', ({target}) => {
    var {id} = target;
    if (id === 'proxy_btn') {
        target.previousElementSibling.value = localStorage.proxy_server;
    }
    else if (id === 'enter_btn') {
        downloadSubmit();
    }
    else if (id === 'upload_btn') {
        uploader.click();
    }
});

async function downloadSubmit() {
    var {json, url, options = {}} = entry;
    if (json) {
        await aria2RPC.addJson(json, options);
    }
    else if (url) {
        await aria2RPC.addUri(url, options);
    }
    entry.value = '';
    entry.json = entry.url = null;
    manager.classList.remove('adduri');
}

uploader.addEventListener('change', async ({target}) => {
    var file = target.files[0];
    var b64encode = await getFileData(file);
    if (file.name.endsWith('torrent')){
        await aria2RPC.addTorrent(b64encode);
    }
    else {
        await aria2RPC.addMetalink(b64encode, aria2Global);
    }
    target.value = '';
    manager.classList.remove('adduri');
});

setting.addEventListener('change', ({target}) => {
    var {id, value} = target;
    localStorage[id] = window[id] = value;
    if (id === 'aria2Server' || id === 'aria2Token') {
        clearInterval(aria2Alive);
        aria2Socket?.close();
        aria2Initial();
    }
    else if (id === 'aria2Interval') {
        clearInterval(aria2Alive);
        aria2Alive = setInterval(updateManager, aria2Interval);
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

function getFileData(file) {
    return new Promise((resolve) => {
        var reader = new FileReader();
        reader.onload = (event) => {
            var base64 = reader.result.slice(reader.result.indexOf(',') + 1);
            resolve(base64);
        };
        reader.readAsDataURL(file);
    });
}

var filesize = {
    'min-split-size': true,
    'disk-cache': true,
    'max-download-limit': true,
    'max-overall-download-limit': true,
    'max-upload-limit': true,
    'max-overall-upload-limit': true
};

async function aria2Initial() {
    aria2StartUp();
    var [options, version] = await aria2RPC.batch([
        ['aria2.getGlobalOption'], ['aria2.getVersion']
    ]);
    entry.options = adduri.querySelectorAll('input, textarea').disposition(options);
    document.querySelector('#aria2_ver').innerText = version.version;
}

var {aria2Server = 'http://localhost:6800/jsonrpc', aria2Token = '', aria2Interval = 10000, aria2Proxy = ''} = localStorage;
setting.querySelectorAll('input').forEach((input) => input.value = window[input.id]);
aria2Initial();
