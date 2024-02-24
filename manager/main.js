var [downloadbtn, optnbtn] = document.querySelectorAll('#download_btn, #options_btn');
var [setting, adduri] = document.querySelectorAll('#setting, #adduri');
var options = setting.querySelectorAll('select, input');
var [entry, uploader] = adduri.querySelectorAll('#entry, #uploader');
var changes = {};

NodeList.prototype.disposition = function (json) {
    var result = {};
    this.forEach((node) => {
        var id = node.dataset.rid;
        var value = json[id];
        if (value) {
            node.value = result[id] = value;
        }
    });
    return result;
}

document.addEventListener('click', ({target}) => {
    var {id} = target;
    if (id === 'proxy_btn') {
        target.previousElementSibling.value = localStorage.aria2Proxy;
        return;
    }
    if (id === 'enter_btn') {
        return downloadSubmit();
    }
    if (id === 'upload_btn') {
        return uploader.click();
    }
    if (id === 'commit_btn') {
        return managerOptionsSave();
    }
    if (id !== 'options_btn' && !setting.contains(target)) {
        return manager.remove('setting');
    }
    if (id !== 'download_btn' && !adduri.contains(target)) {
        return manager.remove('adduri');
    }
});

function managerDownload() {
    manager.toggle('adduri');
}

function managerOptions() {
    manager.toggle('setting');
}

function managerOptionsSave() {
    options.forEach(({id, dataset}) => { localStorage[id] = window[id] ?? dataset.value; });
    if ('manager_interval' in changes) {
        clearInterval(aria2Alive);
        aria2Alive = setInterval(updateManager, aria2Interval);
    }
    aria2UpdateRPC(changes);
    changes = {};
}

function aria2UpdateRPC(changes) {
    if ('jsonrpc_host' in changes) {
        clearInterval(aria2Alive);
        aria2RPC.disconnect();
        return aria2ClientSetUp();
    }
    if ('jsonrpc_scheme' in changes) {
        aria2RPC.method = aria2Scheme;
    }
    if ('jsonrpc_secret' in changes) {
        aria2RPC.secret = aria2Secret;
    }
}

entry.addEventListener('change', (event) => {
    try {
        var json = JSON.parse(entry.value);
        var jsons = (Array.isArray(json) ? json : [json]);
        entry.json = jsons.map(({url, options = {}}) => ({id: '', jsonrpc: '2.0', method: 'aria2.addUri', params: [aria2RPC.secret, [url], {...entry.options, ...options}]}));
        entry.url = null;
    }
    catch (error) {
        entry.json = null;
        entry.url = entry.value.match(/(https?:\/\/|ftp:\/\/|magnet:\?)[^\s\n]+/g);
    }
});

async function downloadSubmit() {
    var {json, url, options = {}} = entry;
    if (json) {
        await aria2RPC.post(JSON.stringify(entry.json));
    }
    else if (url) {
        await aria2RPC.call({method: 'aria2.addUri', params: [url, options]});
    }
    entry.value = '';
    entry.json = entry.url = null;
    manager.remove('adduri');
}

uploader.addEventListener('change', async ({target}) => {
    var file = target.files[0];
    var b64encode = await getFileData(file);
    if (file.name.endsWith('torrent')){
        await aria2RPC.call({method: 'aria2.addTorrent', params: [b64encode]});
    }
    else {
        await aria2RPC.call({method: 'aria2.addMetalink', params: [b64encode, aria2Global]});
    }
    target.value = '';
    manager.remove('adduri');
});

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

setting.addEventListener('change', (event) => {
    var {id, value} = event.target;
    window[id] = changes[id] = value;
});

async function aria2Initial() {
    await aria2ClientSetUp();
    var [options, version] = await aria2RPC.call({method: 'aria2.getGlobalOption'}, {method: 'aria2.getVersion'});
    entry.options = adduri.querySelectorAll('input, textarea').disposition(options.result);
    document.querySelector('#aria2_ver').innerText = version.result.version;
}

options.forEach((input) => {
    var {id, dataset} = input;
    window[id] = input.value = localStorage[id] ?? dataset.value;
});

aria2Initial();
